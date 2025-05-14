import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';
const DoctorAppointments = () => {
    const { appointments, getAppointments, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext);
    const { calculateAge, currency } = useContext(AppContext);
    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken])
    return (
        <div className='w-full max-w-6xl m-5'>
            <h1 className='mb-3 text-lg font-medium'>Danh Sách Lịch Hẹn</h1>
            <div className='bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[70vh] overflow-y-scroll '>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_3fr_2fr_3fr_2fr_2fr_2fr] grid-flow-col gap-1 py-3 px-6 border-b border-gray-300 font-semibold text-base tracking-wide'>
                    <p className=''>#</p>
                    <p>Bệnh Nhân</p>
                    <p>Thanh Toán</p>
                    <p>Tuổi</p>
                    <p>Thời Gian</p>
                    <p>Giá khám</p>
                    <p className='px-2'>Trạng thái</p>
                </div>
                {
                    appointments.reverse().map((item, index) => (
                        <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 border-gray-300 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_3fr_2fr_2fr_2fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 text-base font-medium'>
                            <p className='max-sm:hidden' >{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-10 rounded-full' src={item.userData.image} alt="" />
                                <p>{item.userData.name}</p>
                            </div>
                            <div>
                                <p className='text-sx inline border-green-500 border-2 rounded-full px-2'>{item.payment ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                            </div>
                            <p className='max-sm:hidden px-2'>{calculateAge(item.userData.dob)}</p>
                            <p className='max-sm:hidden'> {item.slotTime}, {item.slotDate}</p>
                            <p className='text-red-400'>{currency}{item.amount.toLocaleString('vi-VN')}</p>
                            <div className='flex gap-2 '>
                                {
                                    item.isCompleted ? (
                                        <p className='text-green-500 px-3'>Đã hoàn tất</p>
                                    ) : item.cancelled ? (
                                        <p className='text-red-500 px-7'>Đã hủy</p>
                                    ) : (
                                        <>
                                            <img className='cursor-pointer hover:scale-110 transition-all duration-300' src={assets.cancel_icon} alt="" onClick={() => cancelAppointment(item._id)} />
                                            <img className='cursor-pointer hover:scale-110 transition-all duration-300' src={assets.tick_icon} alt="" onClick={() => completeAppointment(item._id)} />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorAppointments
