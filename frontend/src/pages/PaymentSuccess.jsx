import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Thanh toán thành công!</h2>
                <p className="text-gray-600 mb-8">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                <Link
                    to="/my-appointments"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Xem lịch hẹn của tôi
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess; 