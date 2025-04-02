import nodemailer from 'nodemailer';

// Cấu hình transporter (dùng Gmail làm ví dụ)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false }
});

// Hàm gửi email xác nhận đặt lịch hẹn
const sendAppointmentConfirmationEmail = async (appointment) => {
    const { userData, docData, slotDate, slotTime, amount, paymentMethod, paymentStatus, _id } = appointment;

    // Nội dung email
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác Nhận Đặt Lịch Hẹn</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            }
            .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 24px;
            }
            .content {
            padding: 20px 0;
            }
            .content p {
            margin: 10px 0;
            }
            .appointment-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            }
            .appointment-details p {
            margin: 5px 0;
            }
            .footer {
            text-align: center;
            padding: 10px 0;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #777;
            }
            .footer a {
            color: #3498db;
            text-decoration: none;
            }
            .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>Xác Nhận Đặt Lịch Hẹn Khám Thành Công</h1>
            </div>
            <div class="content">
            <p>Kính gửi <strong>${userData.name}</strong>,</p>
            <p>Chúng tôi xin thông báo rằng lịch hẹn khám của bạn đã được đặt thành công. Dưới đây là thông tin chi tiết về lịch hẹn:</p>
            
            <div class="appointment-details">
                <p><strong>Mã lịch hẹn:</strong> ${_id}</p>
                <p><strong>Bác sĩ:</strong> ${docData.name}</p>
                <p><strong>Ngày khám:</strong> ${slotDate}</p>
                <p><strong>Thời gian:</strong> ${slotTime}</p>
                <p><strong>Số tiền:</strong> ${amount.toLocaleString('vi-VN')} VND</p>
                <p><strong>Phương thức thanh toán:</strong> ${paymentMethod}</p>
                <p><strong>Trạng thái thanh toán:</strong> ${paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
            </div>

            <p>Vui lòng đến đúng giờ và mang theo giấy tờ tùy thân để làm thủ tục khám bệnh. Nếu bạn cần thay đổi hoặc hủy lịch hẹn, vui lòng liên hệ với chúng tôi qua email <a href="mailto:support@bookingdoctor.com">support@bookingdoctor.com</a> hoặc số hotline <strong>1900 1234</strong>.</p>

            <p style="text-align: center;">
                <a href="http://localhost:5173/my-appointments" class="button">Xem Chi Tiết Lịch Hẹn</a>
            </p>
            </div>
            <div class="footer">
            <p>Trân trọng,<br>Đội ngũ MediLink</p>
            <p>Hotline: 1900 1234 | Email: <a href="mailto:support@bookingdoctor.com">support@bookingdoctor.com</a></p>
            </div>
        </div>
        </body>
        </html>
    `;

    // Cấu hình email
    const mailOptions = {
        from: 'MediLink <2003phuoc2003@gmail.com>',
        to: userData.email,
        subject: 'Xác Nhận Đặt Lịch Hẹn Khám Thành Công - MediLink',
        html: htmlContent,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log('Email xác nhận đã được gửi đến:', userData.email);
};

export default sendAppointmentConfirmationEmail;