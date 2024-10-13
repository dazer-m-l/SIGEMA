const express = require('express');
const router = express.Router();

const {
    getPacientes,
    getPaciente,
    createPaciente,
    updatePaciente,
    deletePaciente
} = require('./controllers/pacienteController');

const {
    getCitas,
    getCita,
    createCita,
    updateCita,
    deleteCita
} = require('./controllers/citaController');

const {
    getMedicos,
    getMedico,
    createMedico,
    updateMedico,
    deleteMedico
} = require('./controllers/medicoController');

const {
    getHorarios,
    getHorario,
    createHorario,
    updateHorario,
    deleteHorario
} = require('./controllers/horarioController');

const {
    getHistorialMedico,
    getHistorialMedicoById,
    createHistorialMedico,
    updateHistorialMedico,
    deleteHistorialMedico
} = require('./controllers/historialMedicoController');

// Rutas para Pacientes
router.route('/pacientes')
    .get(getPacientes)
    .post(createPaciente);

router.route('/pacientes/:curp_p')
    .get(getPaciente)
    .put(updatePaciente)
    .delete(deletePaciente);

// Rutas para Citas
router.route('/citas')
    .get(getCitas)
    .post(createCita);

router.route('/citas/:id_cita')
    .get(getCita)
    .put(updateCita)
    .delete(deleteCita);

// Rutas para Médicos
router.route('/medicos')
    .get(getMedicos)
    .post(createMedico);

router.route('/medicos/:cedula_m')
    .get(getMedico)
    .put(updateMedico)
    .delete(deleteMedico);

// Rutas para Horarios
router.route('/horarios')
    .get(getHorarios)
    .post(createHorario);

router.route('/horarios/:id_horario')
    .get(getHorario)
    .put(updateHorario)
    .delete(deleteHorario);

// Rutas para Historial Médico
router.route('/historial-medico')
    .get(getHistorialMedico)
    .post(createHistorialMedico);

router.route('/historial-medico/:id_historial')
    .get(getHistorialMedicoById)
    .put(updateHistorialMedico)
    .delete(deleteHistorialMedico);

module.exports = router;