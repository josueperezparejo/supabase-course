import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class DatabaseManager {
    constructor() {
        const {
            SUPABASE_DB_PASSWORD,
            SUPABASE_DB_USER,
            SUPABASE_DB_HOST,
            SUPABASE_DB_PORT,
            SUPABASE_DB_NAME,
        } = process.env;

        this.uri = `postgresql://${SUPABASE_DB_USER}:${SUPABASE_DB_PASSWORD}@${SUPABASE_DB_HOST}:${SUPABASE_DB_PORT}/${SUPABASE_DB_NAME}`

        this.sequelize = new Sequelize(this.uri, {
            dialect: 'postgres',
            logging: false,
        });
    }

    async testConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }

    async syncModels(options = { force: false }) {
        try {
            await this.sequelize.sync(options);
            console.log('All models were synchronized successfully.');
        } catch (error) {
            console.error('Unable to synchronize models:', error);
            process.exit(1);
        }
    }

    getInstance() {
        return this.sequelize;
    }
}

export default new DatabaseManager();
