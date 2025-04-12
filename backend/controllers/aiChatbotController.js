import axios from 'axios';
import { OpenAI } from 'openai';
const analyzeSymptoms = async (req, res) => {
    try {
        const { symptomData } = req.body;

        if (!symptomData || typeof symptomData !== 'string' || symptomData.trim() === '') {
            return res.status(400).json({ error: 'Văn bản triệu chứng không được để trống và phải là chuỗi ký tự.' });
        }

        const response = await axios.post('http://localhost:5003/extract-symptoms', {
            text: symptomData
        });

        const { symptom_vector, probabilities, diagnosis } = response.data;

        if (!symptom_vector || !probabilities || !diagnosis) {
            return res.status(500).json({ error: 'Dữ liệu trả về từ API không hợp lệ.' });
        }

        const { specialty, possible_diseases, message } = diagnosis;

        // Tính confidence: Lấy xác suất cao nhất từ probabilities
        const confidence = Math.max(...Object.values(probabilities));

        // Danh sách triệu chứng nghiêm trọng
        const severeSymptoms = [
            'kho_tho', 'tuc_nguc', 'tim_dap_nhanh', 'ngat_xiu', 'ho_ra_mau', 'mat_y_thuc',
            'co_giat', 'nuoc_tieu_co_mau', 'sot_keo_dai', 'dau_bung'
        ];

        // Kiểm tra xem có triệu chứng nghiêm trọng không
        const hasSevereSymptom = Object.keys(symptom_vector).some(
            symptom => severeSymptoms.includes(symptom) && symptom_vector[symptom] === 1
        );

        // Xác định mức độ nghiêm trọng
        const severity = hasSevereSymptom ? 'Nặng' : 'Nhẹ';

        // Danh sách triệu chứng được phát hiện
        const detectedSymptoms = Object.keys(symptom_vector)
            .filter(symptom => symptom_vector[symptom] === 1)
            .map(symptom => symptom.replace('_', ' '));

        // Tạo phản hồi
        const analysis = {
            specialty: specialty || 'Không xác định',
            confidence: (confidence * 100).toFixed(2), // Chuyển confidence thành phần trăm, làm tròn 2 chữ số
            severity,
            detected_symptoms: detectedSymptoms.length > 0 ? detectedSymptoms : ['Không phát hiện triệu chứng'],
            explanation: detectedSymptoms.length > 0
                ? `Dựa trên triệu chứng "${detectedSymptoms.join(', ')}", ${message || 'không thể xác định chuyên khoa.'}`
                : 'Không phát hiện triệu chứng.',
            recommendations: specialty && specialty !== 'Không xác định'
                ? `Hãy đến gặp bác sĩ chuyên khoa ${specialty} để được khám và điều trị. Các bệnh có thể liên quan: ${possible_diseases ? possible_diseases.join(', ') : 'Không xác định'}. ${severity === 'Nặng' ? 'Tình trạng có thể nghiêm trọng, bạn nên đi khám ngay!' : 'Bạn nên đi khám để được chẩn đoán chính xác.'}`
                : 'Không thể xác định chuyên khoa. Bạn nên đến khám tại khoa nội tổng quát để được kiểm tra.'
        };

        return res.status(200).json(analysis);

    } catch (error) {
        console.error('Error in analyzeSymptoms:', error.message);
        if (error.response) {
            return res.status(500).json({ error: `Lỗi từ API phân tích: ${error.response.data.error || 'Không xác định'}` });
        }
        return res.status(500).json({ error: 'Đã có lỗi xảy ra khi phân tích triệu chứng. Vui lòng thử lại.' });
    }
};

const openaiChat = async (req, res) => {
    try {
        // Kiểm tra đầu vào
        const { userMessage, conversation = [] } = req.body;
        if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
            return res.status(400).json({ error: 'Tin nhắn người dùng không hợp lệ.' });
        }

        // Khởi tạo client OpenAI
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        console.log('Lịch sử hội thoại:', conversation);
        console.log('Tin nhắn người dùng:', userMessage);

        // Prompt hệ thống
        const botContent = 'Bạn là trợ lý y tế, chỉ trả lời các câu hỏi liên quan đến y tế và không trả lời bất kỳ câu hỏi nào ngoài lĩnh vực y tế. Khi người dùng cung cấp triệu chứng, hãy thực hiện các bước sau một cách ngắn gọn và xúc tích: 1. Nếu đây là lần đầu tiên người dùng gửi triệu chứng (không có lịch sử hội thoại hoặc chỉ có 1 tin nhắn từ người dùng), hãy đặt câu hỏi đầu tiên để làm rõ triệu chứng. 2. Nếu người dùng đã trả lời 1 hoặc 2 câu hỏi (có 2 hoặc 3 tin nhắn từ người dùng trong lịch sử hội thoại), hãy đặt câu hỏi tiếp theo (tổng cộng 3 câu hỏi). Hiểu rằng các câu trả lời ngắn như "Có", "Không", hoặc các câu trả lời đơn giản khác là hợp lệ và liên quan đến y tế nếu chúng trả lời cho câu hỏi trước đó của bạn. 3. Nếu người dùng đã trả lời đủ 3 câu hỏi (có 4 tin nhắn từ người dùng trong lịch sử hội thoại), không đặt câu hỏi nữa, thay vào đó hãy: - Đưa ra gợi ý về các bệnh có thể mắc phải (tối đa 3 bệnh). - Đề xuất 1 trong 8 chuyên khoa sau: Hô Hấp, Tim Mạch, Cơ - Xương - Khớp, Nội Tiết, Truyền Nhiễm, Thận - Niệu, Thần Kinh, hoặc Nội Tổng Quát. Nếu triệu chứng liên quan đến nhiều chuyên khoa, hãy gợi ý khám ở khoa Nội Tổng Quát. - Khuyến nghị người dùng gặp bác sĩ để được kiểm tra chính xác. Định dạng phản hồi của bạn dưới dạng HTML như sau: "<p>Triệu chứng [triệu chứng] có thể liên quan đến một số bệnh lý sau:</p><p><strong>Những nguyên nhân có thể:</strong></p><ul><li>[Bệnh 1].</li><li>[Bệnh 2].</li><li>[Bệnh 3].</li></ul><p><strong>Đề xuất chuyên khoa:</strong></p><p>Khám tại khoa <strong>[Chuyên khoa].</strong></p><p>Hãy đến cơ sở y tế để kiểm tra và điều trị kịp thời.</p>" Hãy giữ câu trả lời ngắn gọn, rõ ràng, và chuyên nghiệp. Nếu người dùng gửi nội dung không liên quan đến y tế (ví dụ: hỏi về thời tiết, toán học, hoặc các chủ đề không liên quan), hãy trả lời: "<p>Vui lòng chỉ cung cấp thông tin liên quan đến y tế.</p>"';
        
        // Tạo lịch sử hội thoại để gửi cho AI
        const messages = [
            { role: 'system', content: botContent },
            ...conversation.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
            })),
            { role: 'user', content: userMessage },
        ];

        // Gọi API của mô hình
        const response = await client.chat.completions.create({
            messages,
            model: 'gpt-4o', // Sử dụng gpt-4o nếu cần
            temperature: 1,
            max_tokens: 3000,
            top_p: 1,
        });

        console.log('Phản hồi từ mô hình:', response);

        // Kiểm tra phản hồi
        const choices = response.choices;
        if (!choices || choices.length === 0) {
            throw new Error('Không có phản hồi từ mô hình.');
        }

        const reply = choices[0].message.content.trim();
        console.log('Phản hồi gửi về client:', reply);

        // Trả về phản hồi
        res.json({ reply });
    } catch (error) {
        console.error('OpenAI error:', error.message || error);
        res.status(500).json({
            error: 'Chatbot gặp lỗi',
            details: error.message || 'Lỗi không xác định'
        });
    }
};

export { analyzeSymptoms, openaiChat };
