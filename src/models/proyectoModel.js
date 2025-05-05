const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Proyecto = sequelize.define('Proyecto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del proyecto es requerido'
            }
        }
    }
}, {
    tableName: 'proyectos',
    timestamps: false
});

module.exports = Proyecto;
