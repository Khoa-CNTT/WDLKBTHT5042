import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Thanh toán thất bại!</h2>
                <p className="text-gray-600 mb-8">Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
                <Link
                    to="/my-appointments"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Quay lại
                </Link>
            </div>
        </div>
    );
};

export default PaymentFailed; 