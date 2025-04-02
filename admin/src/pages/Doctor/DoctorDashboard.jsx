import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {
    const { dToken, backendUrl, appointments, getAppointments } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)
    const [stats, setStats] = useState({
        totalAppointments: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
        totalEarnings: 0
    })

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    useEffect(() => {
        if (appointments) {
            const total = appointments.length
            const completed = appointments.filter(apt => apt.isCompleted).length
            const cancelled = appointments.filter(apt => apt.cancelled).length
            const earnings = appointments
                .filter(apt => apt.isCompleted && apt.payment)
                .reduce((sum, apt) => sum + apt.amount, 0)

            setStats({
                totalAppointments: total,
                completedAppointments: completed,
                cancelledAppointments: cancelled,
                totalEarnings: earnings
            })
        }
    }, [appointments])

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Bảng điều khiển</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Tổng số lịch hẹn</h3>
                    <p className="text-3xl font-bold">{stats.totalAppointments}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Lịch hẹn đã hoàn tất</h3>
                    <p className="text-3xl font-bold">{stats.completedAppointments}</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Lịch hẹn đã hủy</h3>
                    <p className="text-3xl font-bold">{stats.cancelledAppointments}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Tổng thu nhập</h3>
                    <p className="text-3xl font-bold">{currency}{stats.totalEarnings.toLocaleString('vi-VN')}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Lịch hẹn gần đây</h3>
                <div className="space-y-4">
                    {appointments?.slice(0, 5).map((apt, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <div>
                                <p className="font-medium text-gray-800">{apt.userData?.name}</p>
                                <p className="text-sm text-gray-500">{apt.slotDate}, {apt.slotTime}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-red-500 font-medium min-w-[100px] text-right">
                                    {currency}{apt.amount.toLocaleString('vi-VN')}
                                </span>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium min-w-[120px] text-center ${apt.isCompleted ? 'bg-green-100 text-green-800' :
                                        apt.cancelled ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {apt.isCompleted ? 'Đã hoàn tất' :
                                        apt.cancelled ? 'Đã hủy' :
                                            'Chờ xử lý'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
