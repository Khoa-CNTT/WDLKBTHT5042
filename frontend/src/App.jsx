import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './pages/About'
import Appointment from './pages/AppointMent'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import PaymentFailed from './pages/PaymentFailed'
import PaymentSuccess from './pages/PaymentSuccess'

const App = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className={isLoginPage ? 'w-full h-screen' : 'mx-4 sm:mx-[10%]'}>
      <ToastContainer position='top-right' theme='colored' limit={1} autoClose={3000} hideProgressBar={true} />
      
      {!isLoginPage && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-failed' element={<PaymentFailed />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </div>
  )
}

export default App
