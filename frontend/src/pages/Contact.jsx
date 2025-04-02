import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
    
    return (
        <div>

            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>LIÊN HỆ <span className='text-gray-700 font-semibold'>CHÚNG TÔI</span></p>
            </div>
            
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

                <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-lg text-gray-600'>CƠ SỞ CỦA CHÚNG TÔI</p>
                    <p className='text-gray-700 text-2xl'>04 Nguyễn Văn Linh , Bình Hiên , Hải Châu , Đà Nẵng.</p>
                    <p className='text-gray-500'>Số điện thoại : 0909090909</p>
                    <p className='text-gray-500'>Email : mediLink@gmail.com</p>
                    <p className='font-semibold text-lg text-gray-600'>NHÀ TUYỂN DỤNG</p>
                    <p className='text-gray-500'>Tìm hiểu thêm về đội ngũ của chúng tôi và cơ hội tuyển dụng.</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Khám phá công việc</button>
                </div>
            </div>
        </div>
    )
}

export default Contact