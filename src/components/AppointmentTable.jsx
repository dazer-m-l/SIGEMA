import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const AppointmentTable = ({ appointments = [], onDelete, onEdit, onCreateAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterByDate = (appointment) => {
    const appointmentDate = new Date(appointment.fecha_cita);

    if (dateFilter === 'day') {
      const today = new Date();
      return appointmentDate.toDateString() === today.toDateString();
    }

    if (dateFilter === 'week') {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    }

    if (dateFilter === 'month') {
      const currentMonth = new Date().getMonth();
      return appointmentDate.getMonth() === currentMonth;
    }

    if (dateFilter === 'year') {
      const currentYear = new Date().getFullYear();
      return appointmentDate.getFullYear() === currentYear;
    }

    if (dateFilter === 'custom') {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return appointmentDate >= start && appointmentDate <= end;
    }

    return true;
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearchTerm = appointment.curp_p.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               appointment.motivo_cita.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               appointment.estado_cita.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm && filterByDate(appointment);
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por CURP, motivo o estado"
          className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
        />
        <label htmlFor="dateFilter" className="mr-2">Filtrar por fecha:</label>
        <select
          id="dateFilter"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="all">Todos</option>
          <option value="day">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
          <option value="custom">Personalizado</option>
        </select>
        {dateFilter === 'custom' && (
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>

      {/* Botón Crear Nueva Cita */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onCreateAppointment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear Nueva Cita
        </button>
      </div>
        <br />
      <table className="min-w-full bg-white border border-gray-300 rounded-2xl shadow-xl">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Fecha</th>
            <th className="px-4 py-2 border-b">Motivo</th>
            <th className="px-4 py-2 border-b">Estado</th>
            <th className="px-4 py-2 border-b">Paciente (CURP)</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id_cita}>
              <td className="px-4 py-2 border-b">{appointment.fecha_cita}</td>
              <td className="px-4 py-2 border-b">{appointment.motivo_cita}</td>
              <td className="px-4 py-2 border-b">{appointment.estado_cita}</td>
              <td className="px-4 py-2 border-b">{appointment.curp_p}</td>
              <td className="px-4 py-2 border-b flex items-center space-x-2">
                <button
                  onClick={() => onEdit(appointment)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(appointment.id_cita)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
