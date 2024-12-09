const Paciente = require('../models/Paciente');
const asyncHandler = require('../middleware/asyncHandler');

exports.getPacientes = asyncHandler(async (req, res, next) => {
    const pacientes = await Paciente.findAll();
    res.status(200).json({
        success: true,
        data: pacientes
    });
});

exports.getPaciente = asyncHandler(async (req, res, next) => {
    const paciente = await Paciente.findByPk(req.params.curp_p);

    if (!paciente) {
        return res.status(404).json({
            success: false,
            message: 'Paciente no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: paciente
    });
});

exports.createPaciente = asyncHandler(async (req, res, next) => {
    const paciente = await Paciente.create(req.body);

    res.status(201).json({
        success: true,
        data: paciente
    });
});

exports.updatePaciente = asyncHandler(async (req, res, next) => {
    let paciente = await Paciente.findByPk(req.params.curp_p);

    if (!paciente) {
        return res.status(404).json({
            success: false,
            message: 'Paciente no encontrado'
        });
    }

    paciente = await paciente.update(req.body);

    res.status(200).json({
        success: true,
        data: paciente
    });
});

exports.deletePaciente = asyncHandler(async (req, res, next) => {
    const paciente = await Paciente.findByPk(req.params.curp_p);

    if (!paciente) {
        return res.status(404).json({
            success: false,
            message: 'Paciente no encontrado'
        });
    }

    await paciente.destroy();

    res.status(200).json({
        success: true,
        message: 'Paciente eliminado correctamente'
    });
});