import express from 'express';
import ProjectController from '../controllers/projectController.js';

const router = express.Router();

router.post('/', ProjectController.create);
router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.getById);
router.put('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

export default router;
