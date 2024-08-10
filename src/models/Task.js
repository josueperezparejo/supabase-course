import { DataTypes } from 'sequelize';
import databaseManager from '../config/database.js'; // Importar la instancia de la base de datos
import Project from './Project.js'; // Importa el modelo Project para definir la relación

const sequelize = databaseManager.getInstance(); // Obtener la instancia de Sequelize

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project, // El modelo que estás relacionando
      key: 'id', // La columna a la que hace referencia
    },
    onDelete: 'CASCADE', // Opcional: eliminar todas las tareas si se elimina un proyecto
  },
}, {
  tableName: 'tasks',
  timestamps: true, // O false si no necesitas createdAt y updatedAt
});

export default Task;
