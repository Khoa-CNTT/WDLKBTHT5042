import express from 'express';
import { addDoctor, adminDashBoard, adminLogin, appointmentCancel, appointmentsAdmin, getAllDoctors } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-doctors', authAdmin, getAllDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/appointment-cancel', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashBoard);
export default adminRouter;