// src/controllers/projectController.js
import { Project } from '../models/index.js';

class ProjectController {
    async create(req, res) {
        try {
            const project = await Project.create(req.body);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const projects = await Project.findAll();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (project) {
                await project.update(req.body);
                res.status(200).json(project);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (project) {
                await project.destroy();
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new ProjectController();
