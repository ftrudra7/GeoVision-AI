import express from 'express';
import {
  getAnalyses,
  createAnalysis,
  getAnalysisById,
  deleteAnalysis
} from '../controllers/analysisController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAnalyses);
router.post('/', createAnalysis);
router.get('/:id', getAnalysisById);
router.delete('/:id', deleteAnalysis);

export default router;
