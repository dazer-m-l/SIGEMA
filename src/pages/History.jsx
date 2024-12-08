import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryTable from '../components/HistoryTable';


const Appointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dateRange,setDateRange] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState(""
  
  )

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
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
    if (e.target.value !== 'personalizado') {
      setStartDate('');
      setEndDate('');
    }
  };


  
  const handleEditAppointment = (appointment) => {
    const selectedRange = e.target.value;
    setDateRange(selectedRange);
    setSelectedAppointment(appointment);
    if (selectedRange !== 'personalizado') {
      setStartDate('');
      setEndDate('');
    }
    // setIsEditing(true);
    // setShowModal(true);
  };
  const getDateFilter = (appointment) => {
    const appointmentDate = new Date(appointment.date); // Cambio de nombre para evitar el conflicto
    const today = new Date();
  
    switch (dateRange) {
      case 'dia':
        return appointmentDate.toDateString() === today.toDateString();
      case 'semana':
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        return appointmentDate >= oneWeekAgo && appointmentDate <= today;
      case 'mes':
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        return appointmentDate >= oneMonthAgo && appointmentDate <= today;
      case 'año':
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        return appointmentDate >= oneYearAgo && appointmentDate <= today;
      case 'personalizado':
        const start = new Date(startDate);
        const end = new Date(endDate);
        return appointmentDate >= start && appointmentDate <= end;
      default:
        return true;
    }
  };
  
  

  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesSearchTerm = searchTerm
      ? appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.date.includes(searchTerm)
      : true;

    return matchesSearchTerm && getDateFilter(appointment);
  });
  // const handleEditAppointment = (appointment) => {
  //   setSelectedAppointment(appointment);
  //   setIsEditing(true);
  //   setShowModal(true);
  // };

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4 dark:text-white text-black">Historial de Citas</p>
      <div className='mb-4 flex items-center'>
        <input
          type='text' 
          placeholder='Buscar'
          value={searchTerm}
          onChange={handleSearch}
          className='border p-2 rounded mr-2'
        />
        <select
          value={dateRange}
          onChange={handleDateRangeChange}
          className='border p-2 rounded mr-2'
          >
            <option value="">Filtrar por </option>
            <option value="dia">Dia</option>
            <option value="semana">Semana</option>
            <option value="mes">Mes</option>
            <option value="año">Año</option>
            <option value="personalizado">Personalizado</option>

        </select>
        {dateRange === 'personalizado' && (
        <div className="mb-4">
          <label className="block dark:text-white"> Fecha de inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          />
          <label className="block mt-2 dark:text-white text-gray-800">Fecha de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded ml-2"
            required
          />
        </div>
        )}
        </div>
      

      <HistoryTable
        appointments={filteredAppointments}
        // appointments={appointmentsData}
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
