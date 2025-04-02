import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
const DoctorList = () => {
    const {doctors,getAllDoctors,aToken,changeAlvailability} = useContext(AdminContext);
    useEffect(() => {
        if(aToken) {
            getAllDoctors();
        }
    }, [aToken]);
    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='flex flex-wrap gap-4 pt-5 gap-y-6 w-full'>
                {
                    doctors.map((item,index)=> {
                        return (
                            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                                <img className='bg-indigo-50 group-hover:bg-[#5F6FFF] h-65 aspect-[4/3] transition-all object-cover duration-500' src={item.image} alt="" />
                                <div className='px-4 py-1'>
                                    <p className='text-lg text-neutral-800 font-medium'>{item.name}</p>
                                    <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                                </div>
                                <div className='px-4 pb-2 text-sm flex items-center gap-2'>
                                    <input onChange={() => changeAlvailability(item._id)} className='accent-green-500' type="checkbox" checked={item.available} />
                                    <p className='text-green-500 font-medium'>Available</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DoctorList
