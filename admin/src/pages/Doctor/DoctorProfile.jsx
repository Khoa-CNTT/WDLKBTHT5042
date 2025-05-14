import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'
const DoctorProfile = () => {
    const { dToken, getProfileData, profileData, setProfileData } = useContext(DoctorContext)
    const { backendUrl, currency } = useContext(AppContext)
    const [isEdit,setIsEdit] = useState(false)
    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    const updateProfile = async () => {
        try {
            const updateData = {
                fees: profileData.fees,
                address: profileData.address,
                available: profileData.available
            }
            const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                setIsEdit(false)
            }
            getProfileData()
        } catch (error) {
            toast.error(error.message)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
    }

    return profileData && (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/4">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img 
                            className="w-full h-64 object-cover" 
                            src={profileData.image} 
                            alt="Doctor profile" 
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bác Sĩ {profileData.name}</h2>
                            <p className="text-gray-600 mb-2">{profileData.degree}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">{profileData.speciality}</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    {profileData.experience}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Giới thiệu</h3>
                                <p className="text-gray-600 leading-relaxed">{profileData.about}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className=''>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Giá khám</h3>
                                    <p className="text-2xl font-bold text-red-500">
                                        {currency}{isEdit ? <input type="number" value={profileData.fees} onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} /> : profileData.fees.toLocaleString('vi-VN')}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Địa chỉ</h3>
                                    <p className="text-gray-600">
                                        {isEdit ? 
                                            <input 
                                                type="text" 
                                                value={profileData.address}
                                                onChange={(e) => setProfileData(prev => ({...prev, address: e.target.value}))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="Nhập địa chỉ..."
                                            /> 
                                            : profileData.address
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input 
                                    onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))}
                                    type="checkbox" 
                                    checked={profileData.available}
                                    name="available" 
                                    id="available"
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="available" className="text-gray-700 font-medium">
                                    Đang hoạt động
                                </label>
                            </div>
                            {
                                isEdit ? <button onClick={updateProfile} className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                Lưu thay đổi
                            </button> :
                            <button onClick={() => setIsEdit(!isEdit)} className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                Chỉnh sửa thông tin
                            </button>
                            }

                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
