const Horario = require('../models/Horario');
const asyncHandler = require('../middleware/asyncHandler');

exports.getHorarios = asyncHandler(async (req, res, next) => {
    const horarios = await Horario.findAll();
    res.status(200).json({
        success: true,
        data: horarios
    });
});

exports.getHorario = asyncHandler(async (req, res, next) => {
    const horario = await Horario.findByPk(req.params.id_horario);

    if (!horario) {
        return res.status(404).json({
            success: false,
            message: 'Horario no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: horario
    });
});

exports.createHorario = asyncHandler(async (req, res, next) => {
    const horario = await Horario.create(req.body);

    res.status(201).json({
        success: true,
        data: horario
    });
});

exports.updateHorario = asyncHandler(async (req, res, next) => {
    let horario = await Horario.findByPk(req.params.id_horario);

    if (!horario) {
        return res.status(404).json({
            success: false,
            message: 'Horario no encontrado'
        });
    }

    horario = await horario.update(req.body);

    res.status(200).json({
        success: true,
        data: horario
    });
});

exports.deleteHorario = asyncHandler(async (req, res, next) => {
    const horario = await Horario.findByPk(req.params.id_horario);

    if (!horario) {
        return res.status(404).json({
            success: false,
            message: 'Horario no encontrado'
        });
    }

    await horario.destroy();

    res.status(200).json({
        success: true,
        message: 'Horario eliminado correctamente'
    });
});
