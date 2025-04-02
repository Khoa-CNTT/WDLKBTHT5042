import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
const Navbar = () => {
    const {aToken,setAtoken} = useContext(AdminContext)
    const {dToken,setDtoken} = useContext(DoctorContext)
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        aToken && setAtoken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDtoken('')
        dToken && localStorage.removeItem('dToken')
    }
    return (
        <div className='flex items-center justify-between px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-[#5F6FFF] px-10 py-2 rounded-full text-sm '>Logout</button>
        </div>
    )
}


export default Navbar
