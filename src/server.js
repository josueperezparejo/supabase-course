import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import sequelize from './config/database.js';

import projectsRouter from './routes/projects.js';
import tasksRouter from './routes/tasks.js';

dotenv.config();

const app = express();
const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_DB_KEY);

app.use(express.json());
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export { app, sequelize };
