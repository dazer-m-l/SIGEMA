const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Medico = db.define('Medico', {
    cedula_m: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre_m: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aPaterno_m: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aMaterno_m: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    especialidad_m: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono_m: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eMail_m: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'Medico'
});


module.exports = Medico;
