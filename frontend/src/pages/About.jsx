import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p><span className='text-gray-700 font-medium'>VỀ CHÚNG TÔI</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>Chào mừng đến với MediLink, đối tác tin cậy của bạn trong việc quản lý nhu cầu sức khỏe của bạn một cách tiện lợi và hiệu quả. MediLink, chúng tôi hiểu rõ thách thức mà mọi người gặp phải khi đặt lịch khám bác sĩ và quản lý hồ sơ sức khỏe của mình.</p>
                    <p>MediLink cam kết đạt chất lượng cao trong công nghệ y tế. Chúng tôi liên tục cố gắng cải thiện nền tảng của mình, tích hợp những tiến bộ mới nhất để cải thiện trải nghiệm người dùng và cung cấp dịch vụ tốt nhất. Dù bạn đang đặt lịch khám lần đầu hay quản lý sức khỏe liên tục, MediLink sẽ luôn hỗ trợ bạn mỗi bước đường.</p>
                    <b className='text-gray-800'>Tầm nhìn của chúng tôi</b>
                    <p>Tầm nhìn của MediLink là tạo ra trải nghiệm sức khỏe liên tục và mượt mà cho mọi người dùng. Chúng tôi muốn thực hiện kết nối giữa bệnh nhân và nhà cung cấp dịch vụ y tế, giúp bạn dễ dàng truy cập sức khỏe mà bạn cần, khi bạn cần nó.</p>
                </div>
            </div>

            <div className='text-xl my-4'>
                <p>TẠI SAO <span className='text-gray-700 font-semibold'>CHỌN CHÚNG TÔI</span></p>
            </div>

            <div className='flex flex-col md:flex-row mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>HIỆU QUẢ:</b>
                    <p>Lịch khám được đặt theo thời gian tiện lợi phù hợp với cuộc sống bận rộn của bạn.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>THUẬN TIỆN:</b>
                    <p>Truy cập vào mạng lưới các bác sĩ y tế tin cậy trong khu vực của bạn.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>TIN CẬY:</b>
                    <p>Đội ngũ bác sĩ chuyên nghiệp và được kiểm chứng, đảm bảo sự chính xác và hiệu quả trong công việc của họ.</p>
                </div>
            </div>
        </div>

        


    )
}

export default About