import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const AppointmentTable = ({ appointments = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // Estado para el filtro de fecha
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para filtrar las citas por fecha
  const filterByDate = (appointment) => {
    const appointmentDate = new Date(appointment.fecha_cita);

    if (dateFilter === 'day') {
      const today = new Date();
      return appointmentDate.toDateString() === today.toDateString();
    }

    if (dateFilter === 'week') {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Inicio de la semana (domingo)
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Fin de la semana (sábado)
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

    return true; // Si no hay filtro, no se filtra por fecha
  };

  // Filtrar las citas según el término de búsqueda y el filtro de fecha
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearchTerm = appointment.curp_p.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               appointment.motivo_cita.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               appointment.estado_cita.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm && filterByDate(appointment);
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por CURP, motivo o estado"
          className="px-4 py-2 border border-gray-300 rounded-md"
          style={{ width: '50%' }} // Esto hace que el input ocupe todo el ancho disponible
        />
      </div>

      <div className="mb-4">
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
      </div>

      {/* Inputs para el filtro personalizado */}
      {dateFilter === 'custom' && (
        <div className="flex space-x-2 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Desde"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Hasta"
          />
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300 rounded-2xl shadow-xl">
        <thead className="bg-blue-200 border-b-2 border-blue-300 rounded-t-2xl">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-blue-300">CURP Paciente</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-blue-300">Fecha de Cita</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-blue-300">Cédula Médico</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-blue-300">Motivo</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-blue-300">Estado</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <tr key={appointment.id_cita || index} className="border-b border-gray-300 last:border-none">
                <td className="px-4 py-4 whitespace-nowrap border-r border-gray-300">{appointment.curp_p}</td>
                <td className="px-4 py-4 whitespace-nowrap border-r border-gray-300">{new Date(appointment.fecha_cita).toLocaleString()}</td>
                <td className="px-4 py-4 whitespace-nowrap border-r border-gray-300">{appointment.cedula_m}</td>
                <td className="px-4 py-4 border-r border-gray-300">{appointment.motivo_cita}</td>
                <td className="px-4 py-4 whitespace-nowrap border-r border-gray-300">{appointment.estado_cita}</td>
                <td className="px-4 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => onEdit(appointment)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Actualizar"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(appointment.id_cita)}
                    className="text-red-600 hover:text-red-900"
                    title="Eliminar"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500 border-b border-gray-300">
                No hay registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
