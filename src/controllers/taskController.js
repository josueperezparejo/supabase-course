// src/controllers/taskController.js
import { Task, Project } from '../models/index.js';

class TaskController {
    async create(req, res) {
        try {
            const { projectId, title, status } = req.body;

            // Optional: Validate if the projectId exists
            const project = await Project.findByPk(projectId);
            if (!project) {
                return res.status(400).json({ error: 'Invalid project ID' });
            }

            const task = await Task.create({ projectId, title, status });
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await Task.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                await task.update(req.body);
                res.status(200).json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                await task.destroy();
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TaskController();
