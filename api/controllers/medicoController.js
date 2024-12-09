const Medico = require('../models/Medico');
const Horario = require('../models/Horario');
const asyncHandler = require('../middleware/asyncHandler');
const { Op } = require('sequelize');

// Obtener todos los médicos
exports.getMedicos = asyncHandler(async (req, res, next) => {
    const medicos = await Medico.findAll();
    res.status(200).json({
        success: true,
        data: medicos
    });
});

// Obtener un médico por su cédula
exports.getMedico = asyncHandler(async (req, res, next) => {
    const medico = await Medico.findByPk(req.params.cedula_m);

    if (!medico) {
        return res.status(404).json({
            success: false,
            message: 'Médico no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: medico
    });
});

// Crear un médico y su horario
exports.createMedico = asyncHandler(async (req, res, next) => {
    const { nombre_m, aPaterno_m, aMaterno_m, cedula_m, especialidad_m, telefono_m, eMail_m, horarios } = req.body;

    if (!nombre_m || !aPaterno_m || !aMaterno_m || !cedula_m || !especialidad_m || !telefono_m || !eMail_m || !horarios || horarios.length === 0) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    // Iniciar una transacción para asegurar la integridad de los datos
    const transaction = await Medico.sequelize.transaction();

    try {
        // Crear el médico
        const medico = await Medico.create({
            nombre_m,
            aPaterno_m,
            aMaterno_m,
            cedula_m,
            especialidad_m,
            telefono_m,
            eMail_m
        }, { transaction });

        // Crear los horarios asociados al médico
        const horariosPromises = horarios.map(horario => {
            return Horario.create({
                cedula_m: medico.cedula_m,
                dia_semana: horario.dia_semana,
                hora_inicio: horario.hora_inicio,
                hora_fin: horario.hora_fin
            }, { transaction });
        });

        // Esperar que se creen todos los horarios
        await Promise.all(horariosPromises);

        // Confirmar la transacción
        await transaction.commit();

        res.status(201).json({
            success: true,
            message: 'Médico y horarios creados exitosamente.',
            medico,
            horarios
        });
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error al crear médico y horarios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear médico y sus horarios.',
            error: error.message
        });
    }
});

// Actualizar un médico
exports.updateMedico = asyncHandler(async (req, res, next) => {
    let medico = await Medico.findByPk(req.params.cedula_m);

    if (!medico) {
        return res.status(404).json({
            success: false,
            message: 'Médico no encontrado'
        });
    }

    medico = await medico.update(req.body);

    res.status(200).json({
        success: true,
        data: medico
    });
});

// Eliminar un médico
exports.deleteMedico = asyncHandler(async (req, res, next) => {
    const medico = await Medico.findByPk(req.params.cedula_m);

    if (!medico) {
        return res.status(404).json({
            success: false,
            message: 'Médico no encontrado'
        });
    }

    await medico.destroy();

    res.status(200).json({
        success: true,
        message: 'Médico eliminado correctamente'
    });
});
