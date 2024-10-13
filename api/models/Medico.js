const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Medico = sequelize.define('Medico', {
    cedula_m: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre_m: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aPaterno_m: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aMaterno_m: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidad_m: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono_m: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eMail_m: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_horario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Medico',
    timestamps: false
});

module.exports = Medico;
