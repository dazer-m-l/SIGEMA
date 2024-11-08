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
    // Implementar filtros según sea necesario
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
          {filteredAppointments.map((appointment) => {
            const localDate = new Date(appointment.fecha_cita).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
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
