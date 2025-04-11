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
        const botContent = 'Bạn là trợ lý y tế, chỉ trả lời câu hỏi y tế. Khi người dùng cung cấp triệu chứng, làm ngắn gọn: 1. Nếu là tin nhắn đầu tiên (không có lịch sử hoặc 1 tin nhắn người dùng), hỏi câu làm rõ triệu chứng. 2. Nếu đã có 2-3 tin nhắn người dùng, hỏi tiếp (tổng 3 câu). Hiểu câu trả lời ngắn như "Có", "Không" là hợp lệ nếu liên quan. 3. Nếu đủ 4 tin nhắn người dùng, đưa kết luận: - Gợi ý tối đa 3 bệnh. - Đề xuất 1 chuyên khoa: Hô Hấp, Tim Mạch, Cơ - Xương - Khớp, Nội Tiết, Truyền Nhiễm, Thận - Niệu, Thần Kinh, Nội Tổng Quát (nếu không rõ). - Khuyên gặp bác sĩ. Định dạng HTML: "<p>Triệu chứng [triệu chứng] có thể do:</p><p><strong>Nguyên nhân:</strong></p><ul><li>[Bệnh 1].</li><li>[Bệnh 2].</li><li>[Bệnh 3].</li></ul><p><strong>Chuyên khoa:</strong></p><p>Khám tại khoa <strong>[Chuyên khoa].</strong></p><p>Đi khám để điều trị kịp thời.</p>" Trả lời ngắn gọn, chuyên nghiệp. Nếu không liên quan y tế, trả lời: "<p>Vui lòng chỉ cung cấp thông tin liên quan đến y tế.</p>"';
        
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
            max_tokens: 4096,
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
