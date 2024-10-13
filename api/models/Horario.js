const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Horario = sequelize.define('Horario', {
    id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia_semana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    cedula_m: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Horario',
    timestamps: false
});

module.exports = Horario;
