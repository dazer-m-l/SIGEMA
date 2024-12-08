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

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setIsEditing(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-background') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);
//modificado
  return (
    <div className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <p className="text-lg font-bold mb-4">Gestión de Citas</p>
      <hr className="border-t-2 border-blue-500 dark:border-blue-300 my-4" />
      <br />
      
      <AppointmentTable
        appointments={appointmentsData}
        searchTerm={searchTerm}
        onDelete={handleDeleteAppointment}
        onEdit={handleEditAppointment}
        onCreateAppointment={() => {
          setSelectedAppointment(null);
          setIsEditing(false);
          setShowModal(true);
        }}
      />

      <AnimatePresence>
        {showModal && (
          <motion.div
          ///modificado
            id="modal-background"
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-black dark:bg-opacity-60 z-50" ////
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleOutsideClick}
          > 
          
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-black dark:text-white transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
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
