import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const SpecialityMenu = () => {
  useEffect(() => {
    if (specialityData) {
      const specialities = specialityData.map((item) => item.speciality);
    } else {
      console.log('specialityData is empty');
    }
  }, []);

  return (
    <div
      className='flex flex-col items-center gap-4 py-16 text-gray-800'
      id='speciality'
    >
      <h1 className='text-3xl font-medium'>Tìm kiếm Theo Chuyên Khoa Trong Khoa Nội Tổng Quát</h1>
      <p className='sm:w-1/3 text-center text-lg'>
        Đơn giản là duyệt qua danh sách bác sĩ tin cậy của chúng tôi, đặt lịch hẹn dễ dàng.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-8 pt-5 w-full'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center text-xs cursor-pointer hover:-translate-y-2 transition-all duration-500'
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className='w-50 sm:w-60 mb-3' src={item.image} alt={item.speciality} />
            <p className='text-xl text-center'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
