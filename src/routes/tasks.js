import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

router.post('/', TaskController.create);
router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getById);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
