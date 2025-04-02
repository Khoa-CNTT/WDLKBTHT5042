import axios from 'axios';
import imageCompression from 'browser-image-compression';
import React, { useContext, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 năm');
    const [fees, setFees] = useState('');
    const [speciality, setSpeciality] = useState('Tim Mạch');
    const [degree, setDegree] = useState('');
    const [address, setAddress] = useState('');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);

    const { backendUrl, aToken } = useContext(AdminContext);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!docImg) {
                setLoading(false);
                return toast.error('Please upload doctor image')
            }
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true
            }
            const compressedFile = await imageCompression(docImg, options);
            const formData = new FormData();
            formData.append('image', compressedFile)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', address)
            formData.append('about', about)
            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers: {aToken} });
            if (data.success) {
                toast.success(data.message);
                setDocImg(null);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 năm');
                setFees('');
                setSpeciality('Tim Mạch');
                setDegree('');
                setAddress('');
                setAbout('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error adding doctor. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Thêm Bác Sĩ</p>
            <div className='relative bg-white gap-2 p-8 border border-gray-300 rounded w-full max-w-4xl max-h-[90vh] overflow-y-scroll'>
                {/* Show a loading */}
                {loading && (
                    <div className='absolute inset-0 h-full flex items-center justify-center bg-white bg-opacity-50 z-10'>
                        <MoonLoader color="#5F6FFF" size={84}  cssOverride={{}} speedMultiplier={0.7}/> 
                    </div>
        )}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => { setDocImg(e.target.files[0]) }} type="file" id='doc-img' hidden />
                    <p className='text-xl font-medium'>Tải lên hình ảnh bác sĩ</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='flex flex-col gap-4 w-full lg:flex-1'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Tên bác sĩ</p>
                            <input value={name} onChange={(e) => setName(e.target.value)} className='border rounded border-gray-300 px-3 py-2' type="text" placeholder='Name' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p className=''>Email bác sĩ</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded border-gray-300 px-3 py-2' type="text" placeholder='Email' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Mật khẩu bác sĩ</p>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className='border rounded border-gray-300 px-3 py-2' type="text" placeholder='Password' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Kinh nghiệm bác sĩ</p>
                            <input onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded border-gray-300 px-3 py-2' type="text" placeholder='experience' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Giá khám bác sĩ</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded border-gray-300 px-3 py-2' type="text" placeholder='Fees' required />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-full lg:flex-1'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Chuyên khoa</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 px-2 py-2' name="" id="">
                                <option value="Tim Mạch">Tim Mạch</option>
                                <option value="Hô Hấp - Phổi">Hô Hấp - Phổi</option>
                                <option value="Tiêu Hóa">Tiêu Hóa</option>
                                <option value="Thần Kinh">Thần Kinh</option>
                                <option value="Cơ - Xương - Khớp">Cơ - Xương - Khớp</option>
                                <option value="Nội Tiết">Nội Tiết</option>
                                <option value="Truyền Nhiễm">Truyền Nhiễm</option>
                                <option value="Thận - Niệu">Thận - Niệu</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Quá trình đào tạo</p>
                            <textarea onChange={(e) => setDegree(e.target.value)} value={degree} className='border w-full px-4 pt-2 border-gray-300 ' type='text' placeholder='Write about doctor' rows={5} required></textarea>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Địa chỉ</p>
                            <input onChange={(e) => setAddress(e.target.value)} value={address} className='border rounded border-gray-300 px-3 py-2' type="text" placeholder='Address' required />
                
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-col mt-2 gap-1'>
                    <p className='text-gray-500'>Về bác sĩ</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='border w-full px-4 pt-2 border-gray-300 ' type='text' placeholder='Write about doctor' rows={5} required></textarea>
                </div>
                <button type='submit' className='bg-[#5F6FFF] px-10 py-3 rounded-full text-sm mt-4 text-white transition-transform cursor-pointer hover:scale-110'>Thêm Bác Sĩ</button>
            </div>
        </form>
    )
}

export default AddDoctor
