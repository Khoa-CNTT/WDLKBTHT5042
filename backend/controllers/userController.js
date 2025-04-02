import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
import sendAppointmentConfirmationEmail from '../config/sendMail.js';
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
// api for register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password,phone,gender,dob } = req.body;
        if (!name || !email || !password || !phone || !gender || !dob) {
            return res.status(400).json({ succes: false, message: "All fields are required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ succes: false, message: "Invalid email address" });
        }
        if (password.length < 8) {
            return res.status(400).json({ succes: false, message: "Password must be at least 8 characters" });
        }
        if (!validator.isMobilePhone(phone)) {
            return res.status(400).json({ succes: false, message: "Invalid phone number" });
        }
        // hash password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            dob
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        return res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

// api for login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
            return res.status(200).json({ success: true, message: "Login successful", token })
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
// api for get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");
        return res.status(200).json({ success: true, userData });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// api for update user profile data
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        if (!gender || !name || !phone || !dob) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        return res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

//api for book appointment

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime} = req.body;
        const docData = await doctorModel.findById(docId).select("-password");
        if(!docData.available){
            return res.status(404).json({ success: false, message: "Bác sĩ không khả dụng" });
        }   
        let slot_booked = docData.slot_booked;
        // checking for slot availability
        if(slot_booked[slotDate]){
            if(slot_booked[slotDate].includes(slotTime)){
            return res.status(400).json({ success: false, message: "Giờ khám đã bị đặt" });
            } else {
                slot_booked[slotDate].push(slotTime);
            }
        } else {
            slot_booked[slotDate] = [];
            slot_booked[slotDate].push(slotTime);
        }
        const userData = await userModel.findById(userId).select("-password");
        delete docData.slot_booked
        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        await doctorModel.findByIdAndUpdate(docId, { slot_booked });
        await sendAppointmentConfirmationEmail(newAppointment);
        return res.status(201).json({ success: true, message: "Đã đặt lịch hẹn thành công, vui lòng kiểm tra Gmail để xác nhận!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// api to get all appointment of user
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        return res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData.userId !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
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

export { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, registerUser, updateProfile };

