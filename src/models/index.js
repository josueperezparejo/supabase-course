import Project from './Project.js';
import Task from './Task.js';

// Un proyecto tiene muchas tareas
Project.hasMany(Task, {
  foreignKey: 'projectId',
  as: 'tasks', // Alias opcional para la relación
});

// Una tarea pertenece a un proyecto
Task.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'project', // Alias opcional para la relación
});

// Exportar los modelos para que puedan ser utilizados en otros lugares
export { Project, Task };