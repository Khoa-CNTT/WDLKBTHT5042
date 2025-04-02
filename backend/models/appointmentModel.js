import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, required: true, default: false },
    isCompleted: { type: Boolean, default: false },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'VNPay'],
        default: 'cash'
    },
    paymentDetails: {
        transactionId: String,
        paymentDate: Date,
        amount: Number,
        currency: {
            type: String,
            default: 'VND'
        }
    },
    orderId: { type: String },
});

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)

export default appointmentModel