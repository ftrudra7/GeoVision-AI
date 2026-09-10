import express from 'express';
import { getHistory } from '../controllers/historyController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getHistory);

export default router;
