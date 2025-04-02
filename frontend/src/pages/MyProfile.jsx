import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {
  const { userData, setUserData, token, backendURL, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone) 
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const {data} = await axios.post(backendURL + '/api/user/update-profile', formData, {headers: {token}})
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        loadUserProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }

  return userData && (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-8">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer group">
            <div className="relative inline-block">
              <img 
                className="w-40 h-40 rounded-full object-cover transition-opacity group-hover:opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <img className="w-12 h-12" src={assets.upload_icon} alt="Upload" />
              </div>
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" className="hidden" />
          </label>
        ) : (
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={userData.image} alt="Profile" />
          </div>
        )}

        {isEdit ? (
          <input 
            className="mt-6 text-3xl font-semibold text-gray-800 bg-transparent border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-center"
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h1 className="mt-6 text-3xl font-semibold text-gray-800">{userData.name}</h1>
        )}
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">THÔNG TIN LIÊN HỆ</h2>
          <div className="grid grid-cols-[200px_1fr] gap-4">
            <div className="text-gray-600 font-medium">Email:</div>
            <div className="text-indigo-600">{userData.email}</div>

            <div className="text-gray-600 font-medium">Số điện thoại:</div>
            {isEdit ? (
              <input
                className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <div className="text-indigo-600">{userData.phone}</div>
            )}

            <div className="text-gray-600 font-medium">Địa chỉ:</div>
            {isEdit ? (
              <div className="space-y-3">
                <input
                  className="w-full px-3 py-2 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  value={userData.address || ''}
                  onChange={e => setUserData(prev => ({
                    ...prev,
                    address: e.target.value
                  }))}
                  placeholder="Địa chỉ"
                />
              </div>
            ) : (
              <div className="text-gray-600">
                {userData.address}
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">THÔNG TIN CƠ BẢN</h2>
          <div className="grid grid-cols-[200px_1fr] gap-4">
            <div className="text-gray-600 font-medium">Giới tính:</div>
            {isEdit ? (
              <select 
                className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            ) : (
              <div className="text-gray-600">{userData.gender}</div>
            )}

            <div className="text-gray-600 font-medium">Ngày sinh:</div>
            {isEdit ? (
              <input
                className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="date"
                value={userData.dob}
                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <div className="text-gray-600">{userData.dob}</div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-center">
        {isEdit ? (
          <button
            className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={updateProfileData}
          >
            Lưu thông tin
          </button>
        ) : (
          <button
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile