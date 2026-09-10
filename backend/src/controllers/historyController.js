import db from '../db/database.js';

export function getHistory(req, res, next) {
  try {
    const userId = req.user.id;
    const history = db.prepare(`
      SELECT h.*, a.query, a.region, a.start_year, a.end_year, a.status
      FROM analysis_history h
      LEFT JOIN analyses a ON h.analysis_id = a.id
      WHERE h.user_id = ?
      ORDER BY h.created_at DESC
      LIMIT 100
    `).all(userId);

    res.json({ history });
  } catch (err) {
    next(err);
  }
}
