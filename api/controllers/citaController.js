const Cita = require('../models/Cita');
const asyncHandler = require('../middleware/asyncHandler');

// Obtener todas las citas
exports.getCitas = asyncHandler(async (req, res, next) => {
    const citas = await Cita.findAll();
    res.status(200).json({
        success: true,
        data: citas
    });
});

// Obtener una cita por su ID
exports.getCita = asyncHandler(async (req, res, next) => {
    const cita = await Cita.findByPk(req.params.id_cita);

    if (!cita) {
        return res.status(404).json({
            success: false,
            message: 'Cita no encontrada'
        });
    }

    res.status(200).json({
        success: true,
        data: cita
    });
});

// Crear una nueva cita
exports.createCita = asyncHandler(async (req, res, next) => {
    const cita = await Cita.create(req.body);

    res.status(201).json({
        success: true,
        data: cita
    });
});

// Actualizar una cita
exports.updateCita = asyncHandler(async (req, res, next) => {
    let cita = await Cita.findByPk(req.params.id_cita);

    if (!cita) {
        return res.status(404).json({
            success: false,
            message: 'Cita no encontrada'
        });
    }

    cita = await cita.update(req.body);

    res.status(200).json({
        success: true,
        data: cita
    });
});

// Eliminar una cita
exports.deleteCita = asyncHandler(async (req, res, next) => {
    const cita = await Cita.findByPk(req.params.id_cita);

    if (!cita) {
        return res.status(404).json({
            success: false,
            message: 'Cita no encontrada'
        });
    }

    await cita.destroy();

    res.status(200).json({
        success: true,
        message: 'Cita eliminada correctamente'
    });
});
