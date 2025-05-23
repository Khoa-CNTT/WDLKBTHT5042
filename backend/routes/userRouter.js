import express from 'express';
import { bookAppointment, cancelAppointment, getBookedSlots, getProfile, listAppointment, loginUser, registerUser, updateProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();
// api for register user
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/list-appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/get-booked-slots', authUser, getBookedSlots);
export default userRouter;