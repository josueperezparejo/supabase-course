import databaseManager from './src/config/database.js';
import { app } from './src/server.js';

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await databaseManager.testConnection(); // Testear la conexión
        await databaseManager.syncModels(); // Sincronizar los modelos

        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
