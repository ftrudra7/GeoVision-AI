export function errorHandler(err, req, res, next) {
  console.error('[server error]', err);
  const status = err.status || 500;
  const message = err.message || 'internal server error';
  res.status(status).json({
    error: message,
    status
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'route not found' });
}
