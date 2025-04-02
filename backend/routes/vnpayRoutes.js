import express from 'express';
import { createPaymentUrl, vnpayReturn } from '../controllers/vnpayController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/create-payment', authUser,createPaymentUrl);
router.get('/vnpay-return', vnpayReturn);

export default router;