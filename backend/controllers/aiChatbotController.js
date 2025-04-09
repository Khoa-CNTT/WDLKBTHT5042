import axios from 'axios';

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

export { analyzeSymptoms };
