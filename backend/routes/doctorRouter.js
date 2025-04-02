import express from 'express';
import { appointmentsDoctor, cancelAppointment, doctorList, doctorLogin, doctorProfile, markAppointmentAsCompleted, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();
doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/mark-appointment-as-completed',authDoctor,markAppointmentAsCompleted)
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter;