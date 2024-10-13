const Medico = require('../models/Medico');
const asyncHandler = require('../middleware/asyncHandler');

exports.getMedicos = asyncHandler(async (req, res, next) => {
    const medicos = await Medico.findAll();
    res.status(200).json({
        success: true,
        data: medicos
    });
});

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

exports.createMedico = asyncHandler(async (req, res, next) => {
    const medico = await Medico.create(req.body);

    res.status(201).json({
        success: true,
        data: medico
    });
});

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
