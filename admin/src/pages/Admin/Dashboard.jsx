import axios from 'axios'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const { aToken, backendUrl } = useContext(AdminContext)
    const [dashData, setDashData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
                    headers: { aToken }
                })
                if (data.success) {
                    console.log(data.dashData);
                    
                    setDashData(data.dashData)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error('Lỗi khi tải dữ liệu')
            }
            setLoading(false)
        }
        getDashboardData()
    }, [])

    const chartData = {
        labels: dashData?.monthlyStats?.map(stat => `T${stat._id.month}/${stat._id.year}`) || [],
        datasets: [
            {
                label: 'Số cuộc hẹn',
                data: dashData?.monthlyStats?.map(stat => stat.count) || [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Tổng số bác sĩ</h3>
                    <p className="text-3xl font-bold">{dashData?.totalStats?.doctors || 0}</p>
                </div>
                
                <div className="bg-green-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Tổng số bệnh nhân</h3>
                    <p className="text-3xl font-bold">{dashData?.totalStats?.patients || 0}</p>
                </div>

                <div className="bg-purple-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Tổng số cuộc hẹn</h3>
                    <p className="text-3xl font-bold">{dashData?.totalStats?.appointments || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Thống kê cuộc hẹn theo tháng</h3>
                    <Line data={chartData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Cuộc hẹn gần đây</h3>
                    <div className="space-y-4">
                        {dashData?.latestAppointments?.map((apt, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="font-medium">{apt.userData?.name}</p>
                                    <p className="text-sm text-gray-500">{apt.slotDate}, {apt.slotTime}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${apt.cancelled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                    {apt.cancelled ? 'Đã hủy' : 'Đã đặt'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Thông báo quan trọng</h3>
                <div className="space-y-3">
                    <div className="flex items-center text-yellow-700 bg-yellow-50 p-3 rounded">
                        <span className="font-medium">Cập nhật hệ thống:</span>
                        <span className="ml-2">Bảo trì hệ thống vào ngày 20/12/2025</span>
                    </div>
                    <div className="flex items-center text-blue-700 bg-blue-50 p-3 rounded">
                        <span className="font-medium">Thông báo:</span>
                        <span className="ml-2">Họp giao ban trực tuyến vào 8h sáng thứ 2 ngày 31/03/2025</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
