import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const AppointmentTable = ({ appointments = [], onDelete, onEdit, onCreateAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // Filtro de fecha (día, semana, mes, año, personalizado)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    setStartDate('');
    setEndDate('');
  };

  const filterAppointments = (appointments) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.fecha_cita);
      const today = new Date();
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Filtrar por término de búsqueda
      const matchesSearchTerm =
        appointment.curp_p.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.motivo_cita.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.estado_cita.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtrar por fecha (según el tipo de filtro seleccionado)
      let matchesDate = true;
      if (dateFilter === 'day') {
        const dayStart = new Date(today.setHours(0, 0, 0, 0));
        const dayEnd = new Date(today.setHours(23, 59, 59, 999));
        matchesDate = appointmentDate >= dayStart && appointmentDate <= dayEnd;
      } else if (dateFilter === 'week') {
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay())); // Lunes de la semana
        const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Domingo de la semana
        matchesDate = appointmentDate >= weekStart && appointmentDate <= weekEnd;
      } else if (dateFilter === 'month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1); // Primer día del mes
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Último día del mes
        matchesDate = appointmentDate >= monthStart && appointmentDate <= monthEnd;
      } else if (dateFilter === 'year') {
        const yearStart = new Date(today.getFullYear(), 0, 1); // Primer día del año
        const yearEnd = new Date(today.getFullYear(), 11, 31); // Último día del año
        matchesDate = appointmentDate >= yearStart && appointmentDate <= yearEnd;
      } else if (dateFilter === 'custom') {
        matchesDate = appointmentDate >= start && appointmentDate <= end;
      }

      return matchesSearchTerm && matchesDate;
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-8">
          <input
            type="text"
            placeholder="Buscar Motivo, Estado o CURP..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-6 py-2 w-80"
          />
          <select
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="border border-gray-300 rounded-md px-8 py-2"
          >
            <option value="all">Todos</option>
            <option value="day">Hoy</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="year">Este Año</option>
            <option value="custom">Personalizado</option>
          </select>
          {dateFilter === 'custom' && (
            <div className="flex space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border border-gray-300 rounded-md px-4 py-2"
                placeholder="Fecha de inicio"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border border-gray-300 rounded-md px-4 py-2"
                placeholder="Fecha de fin"
              />
            </div>
          )}
        </div>
        <button
          onClick={onCreateAppointment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Agregar Cita
        </button>
      </div>
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
          {filterAppointments(appointments).map((appointment) => {
            const localDate = new Date(appointment.fecha_cita).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            return (
              <tr key={appointment.id_cita}>
                <td className="px-4 py-2 border-b">{localDate}</td>
                <td className="px-4 py-2 border-b">{appointment.motivo_cita}</td>
                <td className="px-4 py-2 border-b">{appointment.estado_cita}</td>
                <td className="px-4 py-2 border-b">{appointment.curp_p}</td>
                <td className="px-4 py-2 border-b flex items-center space-x-2">
                  <button onClick={() => onEdit(appointment)} className="text-blue-500 hover:text-blue-700">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => onDelete(appointment.id_cita)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
