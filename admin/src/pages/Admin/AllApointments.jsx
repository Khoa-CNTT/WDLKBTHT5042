import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
const AllApointments = () => {
    const {appointments,aToken,getAllAppointments,cancelAppointment} = useContext(AdminContext);
    const {calculateAge,currency} = useContext(AppContext)
    useEffect(() => {
        if(aToken) {
            getAllAppointments();
        }
    },[aToken]);
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>Danh sách lịch hẹn</p>

            <div className='bg-white border border-gray-400 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-400 font-semibold text-base tracking-wide'>
                    <p className=''>#</p>
                    <p>Tên bệnh nhân</p>
                    <p>Tuổi</p>
                    <p>Thời gian</p>
                    <p>Bác sĩ</p>
                    <p>Giá khám</p>
                    <p className='px-2'>Hủy</p>
                </div>
                {
                    appointments.map((item,index)=> (
                        <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 border-gray-400 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 text-base font-medium'>
                                <p className='max-sm:hidden' >{index + 1}</p>
                                <div className='flex items-center gap-2'>
                                    <img className='w-10 rounded-full' src={item.userData.image} alt="" />
                                    <p>{item.userData.name}</p>
                                </div>
                                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                                <p> {item.slotTime}, {item.slotDate}</p>
                                <p>{item.docData.name}</p>
                                <p>{currency}{item.amount}</p>
                                {
                                    item.cancelled
                                    ? <p className='text-red-400 text-sx font-medium'>Đã hủy</p>
                                    : <img className='cursor-pointer hover:scale-110 transition-all duration-300' src={assets.cancel_icon} alt="" onClick={()=>cancelAppointment(item._id)} />
                                }
                                
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllApointments
