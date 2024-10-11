import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AppointmentForm = ({ onSubmit, appointmentToEdit, onClose, doctors }) => {
  const [appointment, setAppointment] = useState(
    appointmentToEdit || {
      patientName: '',
      patientId: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
      status: 'Pendiente',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(appointment);
    if (onClose) onClose(); // Si `onClose` está definido, ciérralo después de enviar
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" style={{ width: '100%', maxWidth: '800px' }}> {/* Ajusta el ancho máximo */}
      <TextField
        label="Nombre del Paciente"
        name="patientName"
        value={appointment.patientName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Identificación del Paciente"
        name="patientId"
        value={appointment.patientId}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Fecha de la Cita"
        name="date"
        type="date"
        value={appointment.date}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Hora de la Cita"
        name="time"
        type="time"
        value={appointment.time}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="doctor-label">Médico Asignado</InputLabel>
        <Select
          labelId="doctor-label"
          name="doctor"
          value={appointment.doctor}
          onChange={handleChange}
          required
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Motivo de la Cita"
        name="reason"
        value={appointment.reason}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="status-label">Estado de la Cita</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={appointment.status}
          onChange={handleChange}
          required
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Confirmada">Confirmada</MenuItem>
          <MenuItem value="Cancelada">Cancelada</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        {appointmentToEdit ? 'Actualizar Cita' : 'Agendar Cita'}
      </Button>
    </form>
  );
};

export default AppointmentForm;
