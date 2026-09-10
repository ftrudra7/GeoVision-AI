import app from './app.js';
import { config } from './config/index.js';
import { initDb } from './db/database.js';

// Initialize SQLite database tables
initDb();

const server = app.listen(config.port, () => {
  console.log(`[geovision server] listening on port ${config.port}`);
  console.log(`[geovision server] environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[geovision server] health check available at: http://localhost:${config.port}/api/health`);
});

process.on('SIGTERM', () => {
  console.log('[geovision server] SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('[geovision server] process terminated');
  });
});
