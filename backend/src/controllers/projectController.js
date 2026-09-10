import db from '../db/database.js';

export function getProjects(req, res, next) {
  try {
    const userId = req.user.id;
    const projects = db.prepare(`
      SELECT p.*, COUNT(a.id) as analysis_count
      FROM projects p
      LEFT JOIN analyses a ON p.id = a.project_id
      WHERE p.user_id = ?
      GROUP BY p.id
      ORDER BY p.updated_at DESC
    `).all(userId);

    res.json({ projects });
  } catch (err) {
    next(err);
  }
}

export function createProject(req, res, next) {
  try {
    const userId = req.user.id;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'project name is required' });
    }

    const result = db.prepare(`
      INSERT INTO projects (user_id, name, description)
      VALUES (?, ?, ?)
    `).run(userId, name.trim(), description ? description.trim() : '');

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
}

export function getProjectById(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const project = db.prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?').get(id, userId);
    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    const analyses = db.prepare('SELECT * FROM analyses WHERE project_id = ? ORDER BY created_at DESC').all(id);

    res.json({ project, analyses });
  } catch (err) {
    next(err);
  }
}

export function updateProject(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'project name is required' });
    }

    const existing = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(id, userId);
    if (!existing) {
      return res.status(404).json({ error: 'project not found' });
    }

    db.prepare(`
      UPDATE projects
      SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(name.trim(), description ? description.trim() : '', id, userId);

    const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    res.json({ project: updated });
  } catch (err) {
    next(err);
  }
}

export function deleteProject(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existing = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(id, userId);
    if (!existing) {
      return res.status(404).json({ error: 'project not found' });
    }

    db.prepare('DELETE FROM projects WHERE id = ? AND user_id = ?').run(id, userId);
    res.json({ message: 'project deleted successfully' });
  } catch (err) {
    next(err);
  }
}
