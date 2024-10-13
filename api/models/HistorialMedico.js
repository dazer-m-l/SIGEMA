const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HistorialMedico = sequelize.define('HistorialMedico', {
    id_historial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    consulta_fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    resumen_consulta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    medicamento_consulta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    examenes_consulta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    curp_p: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cedula_m: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'HistorialMedico',
    timestamps: false
});

module.exports = HistorialMedico;
