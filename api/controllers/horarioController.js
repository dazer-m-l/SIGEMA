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

exports.createHorario = asyncHandler(async (req, res) => {
    const { dia, hora_inicio, hora_fin } = req.body;

    if (!dia || !hora_inicio || !hora_fin) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const nuevoHorario = await Horario.create({
            dia,
            hora_inicio,
            hora_fin,
        });

        res.status(201).json({
            id_horario: nuevoHorario.id_horario,
            message: 'Horario creado exitosamente.',
        });
    } catch (error) {
        console.error('Error al crear horario:', error);
        res.status(500).json({
            message: 'Error al crear horario.',
            error: error.message,
        });
    }
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
