import crypto from 'crypto';
import moment from 'moment';
import config from '../config/vnpay.js';
import appointmentModel from '../models/appointmentModel.js';
// Hàm sắp xếp tham số theo thứ tự alphabet
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(key);
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = obj[str[key]];
    }
    return sorted;
}

const createPaymentUrl = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
        }

        // Set timezone
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        // Lấy IP của người dùng
        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // Tạo ngày giờ theo định dạng VNPay
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const orderId = moment(date).format('HHmmss');
        const amount = Math.round(appointment.amount * 100);

        const vnpParams = {};
        vnpParams['vnp_Version'] = '2.1.0';
        vnpParams['vnp_Command'] = 'pay';
        vnpParams['vnp_TmnCode'] = config.vnp_TmnCode;
        vnpParams['vnp_Locale'] = 'vn';
        vnpParams['vnp_CurrCode'] = 'VND';
        vnpParams['vnp_TxnRef'] = orderId;
        vnpParams['vnp_OrderInfo'] = 'Thanh toan don hang :' + orderId;
        vnpParams['vnp_OrderType'] = 'other';
        vnpParams['vnp_Amount'] = amount;
        vnpParams['vnp_ReturnUrl'] = config.vnp_ReturnUrl;
        vnpParams['vnp_IpAddr'] = ipAddr;
        vnpParams['vnp_CreateDate'] = createDate;

        // Lưu orderId vào appointment để truy xuất sau này
        appointment.orderId = orderId;
        await appointment.save();

        // Sắp xếp tham số
        const sortedParams = sortObject(vnpParams);

        // Tính checksum
        const signData = Object.keys(sortedParams)
            .map((key) => `${key}=${encodeURIComponent(sortedParams[key]).replace(/%20/g, '+')}`)
            .join('&');
        const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex").toUpperCase();
        sortedParams.vnp_SecureHash = signed;

        // Tạo URL thanh toán
        const queryString = Object.keys(sortedParams)
            .map((key) => `${key}=${encodeURIComponent(sortedParams[key]).replace(/%20/g, '+')}`)
            .join('&');
        const paymentUrl = `${config.vnp_Url}?${queryString}`;

        console.log('CreateDate:', createDate);
        console.log('OrderId:', orderId);
        console.log('Amount:', amount);
        console.log('SignData:', signData);
        console.log('SecureHash:', signed);
        console.log('Final URL:', paymentUrl);

        // Trả về paymentUrl để frontend xử lý
        res.json({ paymentUrl });
    } catch (error) {
        console.error('Lỗi tạo URL thanh toán:', error);
        res.status(500).json({ message: 'Lỗi tạo URL thanh toán' });
    }
};

const vnpayReturn = async (req, res) => {
    try {
        console.log('Received request from VNPay:', req.query); // Log yêu cầu từ VNPay
        const vnpParams = req.query;
        const secureHash = vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHashType'];

        // Sắp xếp tham số và tạo chuỗi signData
        const sortedParams = sortObject(vnpParams);
        const signData = Object.keys(sortedParams)
            .map((key) => `${key}=${encodeURIComponent(sortedParams[key]).replace(/%20/g, '+')}`)
            .join('&');
        const checkSum = crypto
            .createHmac('sha512', config.vnp_HashSecret)
            .update(signData)
            .digest('hex')

        console.log('CheckSum:', checkSum);
        console.log('SecureHash:', secureHash);

        if (secureHash === checkSum) {
            const orderId = vnpParams['vnp_TxnRef'];
            const rspCode = vnpParams['vnp_ResponseCode'];

            console.log('Response Code:', rspCode);

            // Tìm appointment dựa trên orderId
            const appointment = await appointmentModel.findOne({ orderId });
            if (!appointment) {
                console.log('Không tìm thấy appointment với orderId:', orderId);
                return res.redirect('http://localhost:5173/payment-failed');
            }

            if (rspCode === '00') {
                // Thanh toán thành công
                await appointmentModel.findByIdAndUpdate(appointment._id, {
                    payment: true,
                    paymentStatus: 'paid',
                    paymentMethod: 'VNPay',
                    paymentDetails: {
                        transactionId: vnpParams['vnp_TransactionNo'],
                        paymentDate: new Date(),
                        amount: parseInt(vnpParams['vnp_Amount']) / 100,
                        currency: 'VND',
                    },
                });

                res.redirect('http://localhost:5173/payment-success');
            } else {
                console.log('Thanh toán thất bại với mã lỗi:', rspCode);
                res.redirect('http://localhost:5173/payment-failed');
            }
        } else {
            console.log('Chữ ký không khớp');
            res.redirect('http://localhost:5173/payment-failed');
        }
    } catch (error) {
        console.error('Lỗi xử lý kết quả thanh toán:', error);
        res.redirect('http://localhost:5173/payment-failed');
    }
};

export { createPaymentUrl, vnpayReturn };
