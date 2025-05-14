import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext()
const AppContextProvider = (props) => {

    const currencySymbol = 'đ' // VND
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    console.log(token);
    
    const [userData, setUserData] = useState(false)
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            } else {
                toast.error("Failed to fetch doctors data.")
            }
        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/user/get-profile', {headers: {token}})
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            setUserData(false)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        doctors,
        currencySymbol,
        token, setToken,backendURL,
        userData, setUserData,loadUserProfileData,
        getDoctorsData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider