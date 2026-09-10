import db from '../db/database.js';

export function getAnalyses(req, res, next) {
  try {
    const userId = req.user.id;
    const analyses = db.prepare(`
      SELECT a.*, p.name as project_name
      FROM analyses a
      LEFT JOIN projects p ON a.project_id = p.id
      WHERE a.user_id = ?
      ORDER BY a.created_at DESC
    `).all(userId);

    res.json({ analyses });
  } catch (err) {
    next(err);
  }
}

export function createAnalysis(req, res, next) {
  try {
    const userId = req.user.id;
    const { query, region, start_year, end_year, project_id, status } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'analysis query is required' });
    }

    const startYearInt = parseInt(start_year, 10) || 2020;
    const endYearInt = parseInt(end_year, 10) || 2024;
    const resolvedRegion = region ? region.trim() : 'delhi ncr, india';
    const resolvedStatus = status || 'completed';

    const result = db.prepare(`
      INSERT INTO analyses (user_id, project_id, query, region, start_year, end_year, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userId, project_id || null, query.trim(), resolvedRegion, startYearInt, endYearInt, resolvedStatus);

    const analysisId = result.lastInsertRowid;

    // Log into analysis_history
    try {
      db.prepare(`
        INSERT INTO analysis_history (user_id, analysis_id, action)
        VALUES (?, ?, ?)
      `).run(userId, analysisId, `executed spatial query: "${query.trim().slice(0, 50)}..."`);
    } catch (e) {
      console.warn('warning: could not write to history:', e);
    }

    const analysis = db.prepare(`
      SELECT a.*, p.name as project_name
      FROM analyses a
      LEFT JOIN projects p ON a.project_id = p.id
      WHERE a.id = ?
    `).get(analysisId);

    res.status(201).json({ analysis });
  } catch (err) {
    next(err);
  }
}

export function getAnalysisById(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const analysis = db.prepare(`
      SELECT a.*, p.name as project_name
      FROM analyses a
      LEFT JOIN projects p ON a.project_id = p.id
      WHERE a.id = ? AND a.user_id = ?
    `).get(id, userId);

    if (!analysis) {
      return res.status(404).json({ error: 'analysis not found' });
    }

    res.json({ analysis });
  } catch (err) {
    next(err);
  }
}

export function deleteAnalysis(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existing = db.prepare('SELECT id FROM analyses WHERE id = ? AND user_id = ?').get(id, userId);
    if (!existing) {
      return res.status(404).json({ error: 'analysis not found' });
    }

    db.prepare('DELETE FROM analyses WHERE id = ? AND user_id = ?').run(id, userId);
    res.json({ message: 'analysis deleted successfully' });
  } catch (err) {
    next(err);
  }
}
