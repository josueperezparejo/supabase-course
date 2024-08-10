import { DataTypes } from 'sequelize';
import databaseManager from '../config/database.js'; // Importar la instancia de la base de datos

const sequelize = databaseManager.getInstance(); // Obtener la instancia de Sequelize

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'projects',
  timestamps: true, // O false si no necesitas createdAt y updatedAt
});

export default Project;
