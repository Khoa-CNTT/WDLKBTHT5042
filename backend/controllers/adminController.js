import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
// api for add doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, degree, speciality, experience, about, fees, address } = req.body;
        const imageFile = req.file
        if (!name || !email || !password || !degree || !speciality || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters long" });
        }
        // hash doctor password
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);
        //up load image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = imageUpload.secure_url;
        const doctorData = {
            name,
            email,
            password: hashPassword,
            degree,
            speciality,
            experience,
            about,
            fees,
            address,
            image: imageUrl,
            date: Date.now()
        }
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api for admin login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, token });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api for get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to get all appointments list 
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api for appointment cancellation 
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        // releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(docId);
        let slot_booked = docData.slot_booked;
        if (slot_booked[slotDate]) {
            slot_booked[slotDate] = slot_booked[slotDate].filter((time) => time !== slotTime);
        }
        await doctorModel.findByIdAndUpdate(docId, { slot_booked });
        return res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

//api to get dashboard data for admin panel
const adminDashBoard = async (req, res) => {
    try {
        // Get total number of doctors, users and appointments
        const totalDoctors = await doctorModel.countDocuments();
        const totalUsers = await userModel.countDocuments();
        const totalAppointments = await appointmentModel.countDocuments();

        // Get latest appointments (5 appointments)
        const latestAppointments = await appointmentModel.find({})
            .sort({ date: -1 })
            .limit(5)
            .populate('docId', 'name speciality');

        // Get appointment stats by status
        const appointmentStats = await appointmentModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get appointment stats by speciality
        const specialityStats = await appointmentModel.aggregate([
            {
                $lookup: {
                    from: "doctors",
                    localField: "docId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            {
                $unwind: "$doctor"
            },
            {
                $group: {
                    _id: "$doctor.speciality",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get appointment stats by month
        const monthlyStats = await appointmentModel.aggregate([
            {
                $addFields: {
                    appointmentDate: {
                        $toDate: "$date"
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$appointmentDate" },
                        year: { $year: "$appointmentDate" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": -1, "_id.month": -1 }
            },
            {
                $limit: 6
            }
        ]);

        const dashData = {
            totalStats: {
                doctors: totalDoctors,
                patients: totalUsers,
                appointments: totalAppointments
            },
            latestAppointments,
            appointmentStats,
            specialityStats,
            monthlyStats
        };

        res.status(200).json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addDoctor, adminDashBoard, adminLogin, appointmentCancel, appointmentsAdmin, getAllDoctors };
