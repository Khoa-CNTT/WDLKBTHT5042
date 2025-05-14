import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ----- Left Section ------- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Chúng tôi là nền tảng đặt lịch khám trực tuyến hàng đầu, kết nối bệnh nhân với hơn 100 bác sĩ chuyên khoa uy tín. Với sứ mệnh mang đến dịch vụ chăm sóc sức khỏe chất lượng và thuận tiện cho mọi người.</p>
        </div>

        {/* ----- Center Section ------- */}
        <div>
          <p className='text-xl font-medium mb-5'>CÔNG TY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Trang chủ</li>
            <li>Về chúng tôi</li>
            <li>Liên hệ chúng tôi</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        {/* ----- Right Section ------- */}
        <div>
          <p className='text-xl font-medium mb-5'>LIÊN HỆ CHÚNG TÔI</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+84-909090909</li>
            <li>mediLink@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
