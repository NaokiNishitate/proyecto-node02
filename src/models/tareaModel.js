const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tarea = sequelize.define('Tarea', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El título es requerido'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción es requerida'
            }
        }
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'proyectos',
            key: 'id'
        }
    }
}, {
    tableName: 'tareas',
    timestamps: false
});

// Establecer relación con Proyecto
const Proyecto = require('./proyectoModel');
Tarea.belongsTo(Proyecto, { foreignKey: 'proyecto_id', as: 'Proyecto' });

module.exports = Tarea;
