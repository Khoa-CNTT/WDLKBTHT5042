import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
const Login = () => {
  const {backendURL,token,setToken} = useContext(AppContext)
  const [state, setState] = useState('Đăng ký')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const navigate = useNavigate()
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (password.length < 8) {
        toast.error("Mật khẩu phải dài ít nhất 8 ký tự.");
        return;
    }
    try {
      if(state === 'Đăng ký') {
          const {data} = await axios.post(backendURL + '/api/user/register', {
            name,
            email,
            password,
            phone,
            gender,
            dob
          })
    
          
          if(data.success) {
            setToken(data.token)
            localStorage.setItem('token', data.token)
            toast.success("Account created successfully")
          } else {
            toast.error(data.message)
          }
      } else {
        const {data} = await axios.post(backendURL + '/api/user/login', {
          email,
          password
        })
        if(data.success) {
          setToken(data.token)
          localStorage.setItem('token', data.token)
          toast.success("Logged in successfully")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 from-sky-500 to-black">
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-xl m-10 shadow-2xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-white mb-3 text-center animate-pulse">
          {state === 'Đăng nhập' ? 'Đăng nhập' : 'Đăng ký'}
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === 'Đăng ký' && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-gray-300">Tên người dùng</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                placeholder="Nhập tên của bạn"
                required
              />
            </div>
          )}

          <div className="animate-slideUp">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          {
            state === 'Đăng ký' && (
              <div className="animate-slideUp">
                <label className="block text-sm font-medium text-gray-300">Số điện thoại</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Nhập số điện thoại của bạn"
              required
                />
              </div>
            )
          }
          {
            state === 'Đăng ký' && (
              <div className="animate-slideUp">
                <label className="block text-sm font-medium text-gray-300">Giới tính</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          )}
          {
            state === 'Đăng ký' && (
              <div className="animate-slideUp">
                <label className="block text-sm font-medium text-gray-300">Ngày sinh</label>
                <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              required
                />
              </div>
            )
          }
          <div className="animate-slideUp delay-100">
            <label className="block text-sm font-medium text-gray-300">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            {state === 'Đăng nhập' ? 'Đăng nhập' : 'Đăng ký'}
          </button>

          <p className="text-gray-400 text-center">
            {state === 'Đăng nhập' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <button
              type="button"
              onClick={() => setState(state === 'Đăng nhập' ? 'Đăng ký' : 'Đăng nhập')}
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              {state === 'Đăng nhập' ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login