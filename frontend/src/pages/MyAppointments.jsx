import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import PaymentButton from '../components/PaymentButton'
import { AppContext } from '../context/AppContext'
const MyAppointments = () => {

  const { backendURL, token } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/list-appointments', { headers: { token } })
      if (data.success) {
        console.log(data.appointments)
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
    }

  }
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendURL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])
  return (
    <div>
      <p className='pb-3 mt-12 text-2xl font-medium text-neutral-800 border-gray-300 border-b'>LỊCH HẸN CỦA TÔI</p>
      <div>
        {appointments.slice(0, 3).map((item, index) => (
          <div className='gird grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-gray-300  border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>Bác Sĩ {item.docData.name}</p>
              <p>Khoa Nội {item.docData.speciality}</p>
              <div>
              <p className="text-gray-900 font-medium mt-1">
              Địa chỉ:{" "}
              <span className="text-cyan-500">
                Phòng Khám Nội Tổng Quát MediLink
              </span>
            </p>
            <p className="text-gray-600 font-medium mt-1">33 Nguyễn Văn Linh, Bình Hiên, Hải Châu, Đà Nẵng</p>
            </div>

              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Thời Gian: </span>{item.slotTime} | {item.slotDate}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-3 justify-center min-w-[150px] '>
              {/* Trường hợp đã hủy */}
              {item.cancelled && (
                <button 
                  className='text-sm font-medium text-red-500 text-center px-4 py-2.5 border border-red-200 rounded-md bg-red-50 cursor-pointer'
                  disabled
                >
                  Đã Hủy
                </button>
              )}

              {/* Trường hợp đã hoàn thành và thanh toán */}
              { item.payment && (
                <button
                  className='text-sm font-medium text-green-500 text-center px-4 py-2.5 border border-green-200 rounded-md bg-green-50 cursor-pointer'
                  disabled
                >
                  Đã Thanh Toán
                </button>
              )}

              {/* Trường hợp đã hoàn thành nhưng chưa thanh toán */}
{!item.cancelled && !item.payment && (
  <PaymentButton
    appointmentId={item._id}
    amount={item.amount}
    className="cursor-pointer"
  />
)}


              {/* Trường hợp chưa hủy và chưa hoàn thành */}
              {!item.cancelled && !item.isCompleted && (
                <button 
                  onClick={() => handleCancelAppointment(item._id)}
                  className='text-sm font-medium text-stone-600 text-center px-4 py-2.5 border border-red-200 rounded-md hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm cursor-pointer'
                >
                  Hủy Lịch Hẹn
                </button>
              )}
              {item.isCompleted && (
                <button 
                  onClick={() => handleCancelAppointment(item._id)}
                  className='text-sm font-medium text-stone-600 text-center px-4 py-2.5 border border-green-200 rounded-md hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300 shadow-sm cursor-pointer'
                >
                  Đã Hoàn Thành
                </button>
              )}
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default MyAppointments