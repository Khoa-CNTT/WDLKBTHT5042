import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        const updatedDoc = await doctorModel.findById(docId);
        if (!updatedDoc) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, message: "Doctor availability changed successfully", updatedDoc });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

// api for doctor login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.status(200).json({ success: true, message: "Doctor logged in successfully", doctor, token });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to mark appointment as completed for doctor panel
const markAppointmentAsCompleted = async (req, res) => {
    try {
        const {docId, appointmentId } = req.body;
            const appointmentData = await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            res.status(200).json({ success: true, message: "Appointment completed" });
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to cancel appointment for doctor panel
const cancelAppointment = async (req, res) => {
    try {
        const {docId, appointmentId } = req.body;
            const appointmentData = await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            res.status(200).json({ success: true, message: "Appointment cancelled" });
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api to get dashboard data for doctor panel
// const getDashboardData = async (req, res) => {
//     try {
//         const { docId } = req.body;
//         const appointments = await appointmentModel.find({ docId });
//         const totalAppointments = appointments.length;
//         const totalEarnings = appointments.reduce((acc, curr) => acc + curr.amount, 0);
//         const totalCompletedAppointments = appointments.filter((appointment) => appointment.isCompleted).length;
//         const totalCancelledAppointments = appointments.filter((appointment) => appointment.cancelled).length;
//         const totalPendingAppointments = totalAppointments - totalCompletedAppointments - totalCancelledAppointments;
//         res.status(200).json({ success: true, totalAppointments, totalEarnings, totalCompletedAppointments, totalCancelledAppointments, totalPendingAppointments });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// api to get profile data for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.status(200).json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api to update profile data for doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId ,fees , address ,available} = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export { appointmentsDoctor, cancelAppointment, changeAvailability, doctorList, doctorLogin, doctorProfile, markAppointmentAsCompleted, updateDoctorProfile };

