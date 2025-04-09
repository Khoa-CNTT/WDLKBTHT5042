# app.py

import re
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from symptom_mappings import SYMPTOMS, KEYWORD_TO_SYMPTOM, SYMPTOM_TO_SPECIALTY_DISEASES

# Thiết lập logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def preprocess_text(text):
    """Tiền xử lý văn bản: làm sạch."""
    try:
        text = re.sub(r'[^\w\s]', '', text)
        text = text.lower().strip()
        logger.info(f"Văn bản sau khi tiền xử lý: {text}")
        return text
    except Exception as e:
        logger.error(f"Lỗi khi tiền xử lý văn bản: {e}")
        raise

def rule_based_symptom_extraction(text):
    """Khớp từ khóa để gán triệu chứng."""
    prob_dict = {symptom: 0.0 for symptom in SYMPTOMS}
    symptom_vector = {symptom: 0 for symptom in SYMPTOMS}

    # Kiểm tra từ khóa trong văn bản
    for keyword, symptom in KEYWORD_TO_SYMPTOM.items():
        if keyword in text:
            prob_dict[symptom] = 1.0
            symptom_vector[symptom] = 1
            logger.info(f"Khớp từ khóa '{keyword}' với triệu chứng '{symptom}'")
            return prob_dict, symptom_vector

    logger.info("Không khớp với từ khóa nào.")
    return prob_dict, symptom_vector

def map_symptoms_to_specialty_diseases(symptom_vector, probabilities):
    """Ánh xạ vector triệu chứng sang chuyên khoa và bệnh."""
    detected_symptoms = [(symptom, probabilities[symptom]) for symptom, value in symptom_vector.items() if value == 1]
    
    if not detected_symptoms:
        return {
            'specialty': 'Không xác định',
            'possible_diseases': 'Không xác định',
            'message': 'Không phát hiện triệu chứng nào.'
        }

    # Chọn triệu chứng có xác suất cao nhất trong số các triệu chứng hợp lệ
    valid_symptoms = [(symptom, prob) for symptom, prob in detected_symptoms if symptom in SYMPTOM_TO_SPECIALTY_DISEASES]
    
    if not valid_symptoms:
        return {
            'specialty': 'Không xác định',
            'possible_diseases': 'Không xác định',
            'message': 'Không thể xác định chuyên khoa.'
        }

    valid_symptoms.sort(key=lambda x: x[1], reverse=True)
    primary_symptom = valid_symptoms[0][0]
    specialty = SYMPTOM_TO_SPECIALTY_DISEASES[primary_symptom]['specialty']
    possible_diseases = SYMPTOM_TO_SPECIALTY_DISEASES[primary_symptom]['possible_diseases']
    message = f"Khả năng cao liên quan đến {specialty}."

    return {
        'specialty': specialty,
        'possible_diseases': possible_diseases,
        'message': message
    }

@app.route('/extract-symptoms', methods=['POST'])
def extract_symptoms():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            logger.warning("Không có trường 'text' trong request.")
            return jsonify({'error': 'No text provided'}), 400

        text = data['text']
        if not text.strip():
            logger.warning("Văn bản đầu vào rỗng.")
            return jsonify({'error': 'Text is empty'}), 400

        logger.info(f"Văn bản đầu vào: {text}")
        processed_text = preprocess_text(text)

        # Sử dụng Rule-based để nhận diện triệu chứng
        prob_dict, symptom_vector = rule_based_symptom_extraction(processed_text)

        logger.info(f"Xác suất dự đoán: {prob_dict}")
        logger.info(f"Symptom vector: {symptom_vector}")

        # Ánh xạ triệu chứng sang chuyên khoa và bệnh
        diagnosis = map_symptoms_to_specialty_diseases(symptom_vector, prob_dict)

        response = {
            'symptom_vector': symptom_vector,
            'probabilities': prob_dict,
            'diagnosis': {
                'message': diagnosis['message'],
                'specialty': diagnosis['specialty'],
                'possible_diseases': diagnosis['possible_diseases'],
                'recommendation': f"Nên khám tại chuyên khoa: {diagnosis['specialty']}"
            }
        }

        logger.info(f"Kết quả: {response}")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Lỗi trong quá trình xử lý: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)