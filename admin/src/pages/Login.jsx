import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state,setState] = useState('Admin')
    const {setAtoken,backendUrl} = useContext(AdminContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {setDtoken} = useContext(DoctorContext)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl+ "/api/admin/login",{email,password});
                if(data.success){
                    toast.success("Login successfully")
                    localStorage.setItem('aToken',data.token)
                    console.log(data.token);
                    
                    setAtoken(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {
                const {data} = await axios.post(backendUrl+ "/api/doctor/login",{email,password})
                console.log(data);
                if(data.success){
                    toast.success("Login successfully")
                    localStorage.setItem('dToken',data.token)
                    setDtoken(data.token);
                } else {
                    toast.error(data.message);
                    console.log(data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                    <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
                    <div className='w-full'>
                        <p>Email</p>
                        <input onChange={(e)=> {setEmail(e.target.value)}} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" placeholder='Nhập Email' required/>
                    </div>
                    <div className='w-full'>
                        <p>Password</p>
                        <input onChange={(e)=> {setPassword(e.target.value)}} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" placeholder='Nhập mật khẩu' required/>
                    </div>
                    <button className='w-full bg-[#5F6FFF] py-2 cursor-pointer mt-1 border font-bold text-white text-base rounded-md'>Login</button>
                    {
                        state == 'Admin' ?
                        <p className='text-base' onClick={()=>setState('Doctor')}>Bạn là bác sĩ ? <span className='text-[#5F6FFF] cursor-pointer'>Đăng nhập tại đây !</span></p>
                        :
                        <p className='text-base' onClick={()=>setState('Admin')}>Bạn là Admin ? <span className='text-[#5F6FFF] cursor-pointer'>Đăng nhập tại đây !</span></p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Login
