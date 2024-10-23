import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
      selected: i === index ? checked : false,
    }));
    setAppointments(updatedAppointments);
  };

  const handleUpdate = () => {
    const selectedAppointmentIndex = appointments.findIndex(appointment => appointment.selected);

    if (selectedAppointmentIndex === -1) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setSelectedAppointmentIndex(selectedAppointmentIndex);
      setIsUpdateModalOpen(true);
    }
  };

  const handleEdit = (updatedAppointment) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[selectedAppointmentIndex] = { ...updatedAppointment, selected: false };
    setAppointments(updatedAppointments);
    setIsUpdateModalOpen(false);
  };

  const handleAdd = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, selected: false }]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Citas Médicas</h1>
        <p className="text-muted-foreground">Esta sección muestra las citas médicas programadas.</p>
      </div>

      <div className="flex justify-between">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleUpdate}
        >
          Actualizar Cita
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar Cita
        </button>
      </div>

      {showAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Por favor, seleccione una cita antes de actualizar.</span>
        </div>
      )}

      <AppointmentTable 
        appointments={appointments} 
        onSelect={handleSelect} 
        onDelete={handleDelete}
      />

      {isUpdateModalOpen && selectedAppointmentIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Actualizar Cita</h2>
            <AppointmentForm
              onSubmit={handleEdit}
              appointmentToEdit={appointments[selectedAppointmentIndex]}
              onClose={() => setIsUpdateModalOpen(false)}
              doctors={doctors}
            />
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Cita</h2>
            <AppointmentForm
              onSubmit={handleAdd}
              onClose={() => setIsAddModalOpen(false)}
              doctors={doctors}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;