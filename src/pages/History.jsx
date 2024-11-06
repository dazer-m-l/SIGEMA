import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryTable from '../components/HistoryTable';


const Appointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchAppointmentsData = async () => {
    try {
      const response = await axios.get('/api/citas');
      console.log('Datos de la API:', response.data);
      setAppointmentsData(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching appointments data:', error);
      setAppointmentsData([]); // Asegurarse de que sea un array en caso de error
    }
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const handleCreateAppointment = async (newAppointment) => {
    try {
      await axios.post('/api/citas', newAppointment);
      fetchAppointmentsData();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      await axios.put(`/api/citas/${updatedAppointment.id_cita}`, updatedAppointment);
      fetchAppointmentsData();
      setShowModal(false);
      setSelectedAppointment(null); // Limpiar la selección
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/citas/${id}`);
      fetchAppointmentsData();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">Historial de Citas</p>

      

      <HistoryTable
        appointments={appointmentsData}
        searchTerm={searchTerm}
        onDelete={handleDeleteAppointment}
        onEdit={handleEditAppointment} // Pasar la función de edición
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Cita' : 'Crear Nueva Cita'}</h2>
            <AppointmentForm
              selectedAppointment={selectedAppointment}
              isEditing={isEditing}
              onCreate={handleCreateAppointment}
              onUpdate={handleUpdateAppointment}
              onCancel={() => {
                setShowModal(false);
                setSelectedAppointment(null);
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
