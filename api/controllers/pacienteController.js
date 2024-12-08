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
    //modificado
// agregar email y foto de perfil
// agregar email
exports.getProfile = asyncHandler(async (req, res) => {
    const { curp_p } = req.params; // Se usa el `curp_p` para identificar al usuario
    const paciente = await Paciente.findByPk(curp_p);

    if (!paciente) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(paciente);
});

// perfil
exports.updateProfileImage = asyncHandler(async (req, res) => {
    const { curp_p } = req.params;
    const { imagen_perfil } = req.body; // Supongamos que envías la URL de la imagen

    const paciente = await Paciente.findByPk(curp_p);
    if (!paciente) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    paciente.imagen_perfil = imagen_perfil;
    await paciente.save();

    res.json({ message: 'Imagen de perfil actualizada', paciente });
});
});
