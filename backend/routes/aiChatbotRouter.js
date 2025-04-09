import express from 'express';
import { analyzeSymptoms } from '../controllers/aiChatbotController.js';

const aiChatbotRouter = express.Router();
aiChatbotRouter.post('/symptoms', analyzeSymptoms);

export default aiChatbotRouter;