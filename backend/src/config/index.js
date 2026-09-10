import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'geovision_default_jwt_secret_dev_key',
  jwtExpiresIn: '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  dbPath: path.resolve(__dirname, '../../geovision.db')
};
