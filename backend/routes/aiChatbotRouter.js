import express from 'express';
import { openaiChat } from '../controllers/aiChatbotController.js';

const aiChatbotRouter = express.Router();
// aiChatbotRouter.post('/symptoms', analyzeSymptoms);
aiChatbotRouter.post('/chat', openaiChat);
export default aiChatbotRouter;