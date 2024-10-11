import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Alert } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentTable from '../components/AppointmentTable';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      patientName: 'Juan Pérez',
      patientId: '12345',
      date: '2023-06-15',
      time: '10:00',
      doctor: '1',
      reason: 'Chequeo anual',
      status: 'Pendiente',
      selected: false,
    }
    // Agrega más citas aquí si es necesario
  ]);
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Nuevo estado para el modal de agregar cita
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const doctors = [
    { id: '1', name: 'Dr. García', specialty: 'Cardiología' },
    { id: '2', name: 'Dra. Rodríguez', specialty: 'Pediatría' },
    // Agrega más médicos aquí si es necesario
  ];

  const handleSelect = (index, checked) => {
    const updatedAppointments = appointments.map((appointment, i) => ({
      ...appointment,
      selected: i === index ? checked : false, // Solo permite seleccionar una cita
    }));
    setAppointments(updatedAppointments);
  };

  const handleUpdate = () => {
    const selectedAppointmentIndex = appointments.findIndex(appointment => appointment.selected);

    if (selectedAppointmentIndex === -1) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Muestra la alerta por 3 segundos
    } else {
      setSelectedAppointmentIndex(selectedAppointmentIndex);
      setIsUpdateModalOpen(true);
    }
  };

  const handleEdit = (updatedAppointment) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[selectedAppointmentIndex] = { ...updatedAppointment, selected: false };
    setAppointments(updatedAppointments);
    setIsUpdateModalOpen(false); // Cierra el modal después de editar
  };

  // Nueva función para agregar una cita
  const handleAdd = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, selected: false }]); // Añadimos la nueva cita
    setIsAddModalOpen(false); // Cierra el modal después de agregar
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Citas Médicas</h1>
        <p className="text-muted-foreground">Esta sección muestra las citas médicas programadas.</p>
      </div>

      {/* Botones de acciones */}
      <div className="flex justify-between">
        <Button variant="contained" onClick={handleUpdate}>
          Actualizar Cita
        </Button>
        <Button variant="contained" onClick={() => setIsAddModalOpen(true)}> {/* Abre el modal para agregar cita */}
          Agregar Cita
        </Button>
      </div>

      {/* Alerta si no hay selección */}
      {showAlert && (
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          Por favor, seleccione una cita antes de actualizar.
        </Alert>
      )}

      {/* Tabla de citas */}
      <AppointmentTable appointments={appointments} onSelect={handleSelect} />

      {/* Modal para actualizar cita */}
      {isUpdateModalOpen && selectedAppointmentIndex !== null && (
        <Dialog open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
          <DialogTitle>Actualizar Cita</DialogTitle>
          <DialogContent>
            <AppointmentForm
              onSubmit={handleEdit}
              appointmentToEdit={appointments[selectedAppointmentIndex]} // Cargamos los datos seleccionados
              onClose={() => setIsUpdateModalOpen(false)}
              doctors={doctors}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Modal para agregar nueva cita */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>Agregar Nueva Cita</DialogTitle>
        <DialogContent>
          <AppointmentForm
            onSubmit={handleAdd} // Envía la nueva cita al agregar
            onClose={() => setIsAddModalOpen(false)}
            doctors={doctors} // Pasamos la lista de doctores al formulario
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
