const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cita = sequelize.define('Cita', {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_cita: {
        type: DataTypes.DATE,
        allowNull: false
    },
    motivo_cita: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_cita: {
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
    tableName: 'Cita',
    timestamps: false
});

module.exports = Cita;
