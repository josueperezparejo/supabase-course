import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import sequelize from './config/database.js';

import projectsRouter from './routes/projects.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev'))
app.use(express.json());

// Rutas
app.use('/auth', authRouter); 
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export { app, sequelize };
