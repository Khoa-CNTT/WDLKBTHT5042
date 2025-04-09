# create_training_data.py

import pandas as pd
import random
import re
import logging
from symptom_mappings import SYMPTOMS, SYMPTOM_TO_KEYWORDS

# Thiết lập logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Danh sách các mẫu câu
sentence_templates = [
    "Tôi bị {symptom}.",
    "Tôi cảm thấy {symptom} khi {context}.",
    "Tôi không bị {symptom}, nhưng bị {symptom2}.",
    "Tôi thường xuyên {symptom} vào ban đêm.",
    "Tôi {symptom} sau khi ăn."
]

# Danh sách ngữ cảnh
contexts = [
    "leo cầu thang",
    "nằm xuống",
    "ăn uống",
    "làm việc nặng",
    "ngủ"
]

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

def generate_training_data(num_samples=5000):
    """Tạo dữ liệu huấn luyện."""
    data = []
    labels = []

    # Đảm bảo mỗi triệu chứng có ít nhất 50 mẫu
    samples_per_symptom = max(50, num_samples // len(SYMPTOMS))

    for symptom in SYMPTOMS:
        keywords = SYMPTOM_TO_KEYWORDS.get(symptom, [symptom.replace('_', ' ')])
        for _ in range(samples_per_symptom):
            # Chọn ngẫu nhiên một mẫu câu
            template = random.choice(sentence_templates)
            
            # Tạo nhãn: tất cả triệu chứng đều là 0
            label = [0] * len(SYMPTOMS)
            
            # Chọn triệu chứng chính
            main_symptom_idx = SYMPTOMS.index(symptom)
            label[main_symptom_idx] = 1
            main_keyword = random.choice(keywords)

            # Tạo câu
            if "{symptom2}" in template:
                # Chọn một triệu chứng phụ khác
                other_symptom = random.choice([s for s in SYMPTOMS if s != symptom])
                other_keyword = random.choice(SYMPTOM_TO_KEYWORDS.get(other_symptom, [other_symptom.replace('_', ' ')]))
                sentence = template.format(symptom=main_keyword, symptom2=other_keyword)
                label[SYMPTOMS.index(other_symptom)] = 1
            elif "{context}" in template:
                context = random.choice(contexts)
                sentence = template.format(symptom=main_keyword, context=context)
            else:
                sentence = template.format(symptom=main_keyword)

            # Tiền xử lý câu
            processed_sentence = preprocess_text(sentence)
            data.append(processed_sentence)
            labels.append(label)

    # Tạo DataFrame
    df = pd.DataFrame(labels, columns=SYMPTOMS)
    df['text'] = data

    # Kiểm tra phân bố nhãn
    symptom_counts = df[SYMPTOMS].sum()
    logger.info("Phân bố nhãn sau khi tạo dữ liệu:")
    logger.info(symptom_counts)

    return df

def save_data(df, filename='training_data.csv'):
    """Lưu dữ liệu vào file CSV."""
    df.to_csv(filename, index=False)
    logger.info(f"Đã lưu dữ liệu vào {filename}")

if __name__ == "__main__":
    # Tạo 5000 mẫu dữ liệu
    df = generate_training_data(num_samples=5000)
    save_data(df, 'training_data.csv')