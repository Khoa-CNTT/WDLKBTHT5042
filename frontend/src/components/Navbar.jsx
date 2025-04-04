import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { token, setToken, userData } = useContext(AppContext)
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/')
    } 
    const login = () => {
        navigate('/login')
    }
    return (
        <div className='flex items-center justify-between text-[15px] py-4 mb-5 border-b border-b-gray-400 sticky top-0 bg-white z-50'>
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer hover:scale-105 transition-transform duration-300' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-8 font-medium'>
                <NavLink to='/' className='relative group'>
                    <li className='py-1 hover:text-primary transition-colors duration-300'>TRANG CHỦ</li>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
                </NavLink>
                <NavLink onClick={() => window.scrollTo(0, 0)} to='/doctors' className='relative group'>
                    <li className='py-1 hover:text-primary transition-colors duration-300'>TẤT CẢ BÁC SĨ</li>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
                </NavLink>
                <NavLink to='/about' className='relative group'>
                    <li className='py-1 hover:text-primary transition-colors duration-300'>VỀ CHÚNG TÔI</li>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
                </NavLink>
                <NavLink to='contact' className='relative group'>
                    <li className='py-1 hover:text-primary transition-colors duration-300'>LIÊN HỆ</li>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
                </NavLink>
                <NavLink to='/chatbot' className='relative group'>
                    <li className='py-1 hover:text-primary transition-colors duration-300'>CHAT BOT</li>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 h-8 rounded-full object-cover ring-2 ring-primary ring-offset-2 transition-all duration-300' src={userData.image} alt="" />
                            <img className='w-2.5 transition-transform group-hover:rotate-180 duration-300' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                                <div className='min-w-48 bg-white shadow-lg rounded-lg flex flex-col gap-4 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                    <p onClick={() => navigate('my-profile')} className='hover:text-primary hover:translate-x-2 transition-all duration-300 cursor-pointer'>Hồ sơ của tôi</p>
                                    <p onClick={() => navigate('my-appointments')} className='hover:text-primary hover:translate-x-2 transition-all duration-300 cursor-pointer'>Lịch khám của tôi</p>
                                    <p onClick={logout} className='hover:text-primary hover:translate-x-2 transition-all duration-300 cursor-pointer'>Đăng xuất</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={login} className='bg-primary cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg'>Tạo tài khoản</button>
                }
            </div>
        </div>
    )
}

export default Navbar
