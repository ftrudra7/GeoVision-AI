import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import analysisRoutes from './routes/analyses.js';
import historyRoutes from './routes/history.js';
import healthRoutes from './routes/health.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

const app = express();

// CORS configuration allowing frontend development URLs
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analyses', analysisRoutes);
app.use('/api/history', historyRoutes);

// Catch-all 404 & Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
