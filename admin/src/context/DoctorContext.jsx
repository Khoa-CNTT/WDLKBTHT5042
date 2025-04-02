import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');
    const [appointments,setAppointment] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [profileData,setProfileData] = useState(false);

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
            if(data.success){
                setAppointment(data.appointments.reverse());
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message);
        }
    }

    // complete appointment
    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/mark-appointment-as-completed',{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message);
        }
    }

    // cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message);
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(data.message);
        }
    }
    const value = {
        dToken,
        setDtoken,getAppointments,appointments,completeAppointment
        ,cancelAppointment,getProfileData,profileData,setProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;