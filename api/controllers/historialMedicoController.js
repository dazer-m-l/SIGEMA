const HistorialMedico = require('../models/HistorialMedico');
const asyncHandler = require('../middleware/asyncHandler');

// Obtener todo el historial médico
exports.getHistorialMedico = asyncHandler(async (req, res, next) => {
    const historiales = await HistorialMedico.findAll();
    res.status(200).json({
        success: true,
        data: historiales
    });
});

// Obtener un historial médico por su ID
exports.getHistorialMedicoById = asyncHandler(async (req, res, next) => {
    const historial = await HistorialMedico.findByPk(req.params.id_historial);

    if (!historial) {
        return res.status(404).json({
            success: false,
            message: 'Historial Médico no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: historial
    });
});

// Crear un nuevo historial médico
exports.createHistorialMedico = asyncHandler(async (req, res, next) => {
    const historial = await HistorialMedico.create(req.body);

    res.status(201).json({
        success: true,
        data: historial
    });
});

exports.updateHistorialMedico = asyncHandler(async (req, res, next) => {
    let historial = await HistorialMedico.findByPk(req.params.id_historial);

    if (!historial) {
        return res.status(404).json({
            success: false,
            message: 'Historial Médico no encontrado'
        });
    }

    historial = await historial.update(req.body);

    res.status(200).json({
        success: true,
        data: historial
    });
});

exports.deleteHistorialMedico = asyncHandler(async (req, res, next) => {
    const historial = await HistorialMedico.findByPk(req.params.id_historial);

    if (!historial) {
        return res.status(404).json({
            success: false,
            message: 'Historial Médico no encontrado'
        });
    }

    await historial.destroy();

    res.status(200).json({
        success: true,
        message: 'Historial Médico eliminado correctamente'
    });
});
