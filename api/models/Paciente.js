const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Paciente = sequelize.define('Paciente', {
    curp_p: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aPaterno_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aMaterno_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo_p: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nss_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciudad_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_p: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Paciente',
    timestamps: false
});

module.exports = Paciente;