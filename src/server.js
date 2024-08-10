import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import sequelize from './config/database.js';

import projectsRouter from './routes/projects.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';

import errorHandler from './middlewares/errorHandler.js';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers, typeDefs } from './graphql/index.js';

dotenv.config();

const app = express();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

async function setupServer() {
    try {
        await server.start()

        // Middleware
        app.use(morgan('dev'))
        app.use(express.json());

        // Rutas
        app.use('/auth', authRouter);
        app.use('/projects', projectsRouter);
        app.use('/tasks', tasksRouter);

        // ApolloServer
        app.use('/graphql', express.json(), expressMiddleware(server));

        // errorHandler
        app.use(errorHandler);
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

setupServer()

export { app, sequelize };
