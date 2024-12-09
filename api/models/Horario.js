const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Horario = sequelize.define('Horario', {
    id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dia_semana: {
        type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
    },
    hora_fin: {
        type: DataTypes.TIME,
    },
    cedula_m: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Medicos',
            key: 'cedula_m'
        }
    }
}, {
    tableName: 'Horario',
    timestamps: false
});

module.exports = Horario;
