import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';  // Importa motion y AnimatePresence
import AppointmentTable from '../components/AppointmentTable';
import AppointmentForm from '../components/AppointmentForm';

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

  // Función para eliminar una cita con confirmación usando window.confirm
  const handleDeleteAppointment = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este registro?');
    if (isConfirmed) {
      try {
        await axios.delete(`/api/citas/${id}`);
        alert("¡Eliminado con éxito!");  // Mensaje de éxito
        fetchAppointmentsData(); // Refrescar la lista de citas
      } catch (error) {
        alert("Hubo un problema al eliminar el registro.");  // Mensaje de error
        console.error('Error deleting appointment:', error);
      }
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

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setIsEditing(false);
  };

  // Cerrar el modal cuando el usuario haga clic fuera del modal
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-background') {
      handleCloseModal();
    }
  };

  // Cerrar el modal cuando se presiona la tecla ESC
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">Gestión de Citas</p>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            setSelectedAppointment(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear Nuevo
        </button>
      </div>

      <AppointmentTable
        appointments={appointmentsData}
        searchTerm={searchTerm}
        onDelete={handleDeleteAppointment}  // Pasar la función de eliminación
        onEdit={handleEditAppointment}
      />

      <AnimatePresence>
        {showModal && (
          <motion.div
            id="modal-background"
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
            initial={{ opacity: 0, scale: 0.9 }}  // Animación de inicio (más pequeño y opaco)
            animate={{ opacity: 1, scale: 1 }}  // Animación de llegada (normal)
            exit={{ opacity: 0, scale: 0.9 }}  // Animación de salida (más pequeño y opaco)
            transition={{ duration: 0.3 }}  // Duración de la animación
            onClick={handleOutsideClick}  // Detectar clic fuera del modal
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Cita' : 'Crear Nueva Cita'}</h2>
              <AppointmentForm
                selectedAppointment={selectedAppointment}
                isEditing={isEditing}
                onCreate={handleCreateAppointment}
                onUpdate={handleUpdateAppointment}
                onCancel={handleCloseModal}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Appointments;
