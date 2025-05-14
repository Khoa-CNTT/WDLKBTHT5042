import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600 text-2xl'>Chọn chuyên khoa bác sĩ mà bạn muốn khám.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-base font-medium text-gray-600'>
          <p onClick={()=> speciality === 'Tim Mạch' ? navigate ('/doctors') : navigate('/doctors/Tim Mạch')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Tim Mạch" ? "bg-indigo-100 text-black" : "" }`}>Tim Mạch</p>
          <p onClick={()=> speciality === 'Hô Hấp - Phổi' ? navigate ('/doctors') : navigate('/doctors/Hô Hấp - Phổi')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Hô Hấp - Phổi" ? "bg-indigo-100 text-black" : "" }`}>Hô Hấp - Phổi</p>
          <p onClick={()=> speciality === 'Tiêu Hóa' ? navigate ('/doctors') : navigate('/doctors/Tiêu Hóa')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Tiêu Hóa" ? "bg-indigo-100 text-black" : "" }`}>Tiêu Hóa</p>
          <p onClick={()=> speciality === 'Thần Kinh' ? navigate ('/doctors') : navigate('/doctors/Thần Kinh')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Thần Kinh" ? "bg-indigo-100 text-black" : "" }`}>Thần Kinh</p>
          <p onClick={()=> speciality === 'Cơ - Xương - Khớp' ? navigate ('/doctors') : navigate('/doctors/Cơ - Xương - Khớp')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Cơ - Xương - Khớp" ? "bg-indigo-100 text-black" : "" }`}>Cơ - Xương - Khớp</p>
          <p onClick={()=> speciality === 'Nội Tiết' ? navigate ('/doctors') : navigate('/doctors/Nội Tiết')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Nội Tiết" ? "bg-indigo-100 text-black" : "" }`}>Nội Tiết</p>
          <p onClick={()=> speciality === 'Truyền Nhiễm' ? navigate ('/doctors') : navigate('/doctors/Truyền Nhiễm')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Truyền Nhiễm" ? "bg-indigo-100 text-black" : "" }`}>Truyền Nhiễm</p>
          <p onClick={()=> speciality === 'Nội Tổng Quát' ? navigate ('/doctors') : navigate('/doctors/Nội Tổng Quát')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Nội Tổng Quát" ? "bg-indigo-100 text-black" : "" }`}>Nội Tổng Quát</p>
          <p onClick={()=> speciality === 'Thận - Niệu' ? navigate ('/doctors') : navigate('/doctors/Thận - Niệu')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === "Thận - Niệu" ? "bg-indigo-100 text-black" : "" }`}>Thận - Niệu</p>
        </div>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)} 
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}>
              <img className="bg-blue-50 w-full h-70 object-cover" src={item.image} loading="lazy" alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>{item.available ? 'Sẵn sàng' : 'Không sẵn sàng'}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
