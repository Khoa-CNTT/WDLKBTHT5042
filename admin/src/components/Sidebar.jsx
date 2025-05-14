import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    return (
        <div className='min-h-screen border-r border-gray-300 shadow-xl bg-white '>
            {
                aToken ?
                <ul className='text-[#515151] mt-5'>
                    <NavLink to={'/admin-dashboard'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.home_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Trang Tổng Quan</p>
                    </NavLink>
                    <NavLink to={'/all-appointments'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.appointment_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Danh Sách Lịch Hẹn</p>
                    </NavLink>
                    <NavLink to={'/add-doctor'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.add_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Thêm Bác Sĩ</p>
                    </NavLink>
                    <NavLink to={'/doctor-list'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.people_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Danh Sách Bác Sĩ</p>
                    </NavLink>
                </ul> :
                <>
                    <ul className='text-[#515151] mt-5'>
                    <NavLink to={'/doctor-dashboard'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.home_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Trang Tổng Quan</p>
                    </NavLink>
                    <NavLink to={'/doctor-appointments'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.appointment_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Danh Sách Lịch Hẹn</p>
                    </NavLink>
                    <NavLink to={'/doctor-profile'} className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 rounded-l md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img className='w-5 h-5' src={assets.add_icon} alt="" />
                        <p className='font-semibold hidden md:block'>Hồ Sơ Bác Sĩ</p>
                    </NavLink>
                </ul>
                </>
            }
        </div>
    )
}

export default Sidebar
