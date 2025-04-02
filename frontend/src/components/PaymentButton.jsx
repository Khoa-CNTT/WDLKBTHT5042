import axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const PaymentButton = ({ appointmentId, amount }) => {
    const { backendURL,token } = useContext(AppContext)
    const handleVNPayPayment = async () => {
        try {
            const response = await axios.post(backendURL + '/api/payment/create-payment', {
                appointmentId,
                amount
            },{headers:{token}});
            window.location.href = response.data.paymentUrl;
        } catch (error) {
            console.error('Lỗi tạo thanh toán:', error);
            alert('Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.');
        }
    };

    return (
        <button
            onClick={handleVNPayPayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Thanh toán {amount.toLocaleString('vi-VN')}đ qua VNPay
        </button>
    );
};

export default PaymentButton; 