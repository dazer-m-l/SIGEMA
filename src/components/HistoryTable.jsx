import React from 'react';
import { Trash2, Edit2 } from 'lucide-react'; // Importa el ícono de lápiz

const HistoryTable = ({ appointments = [], onDelete, onEdit, searchTerm }) => {
  if (!Array.isArray(appointments)) {
    console.error('El valor de appointments no es un array:', appointments);
    return <p>Error: Datos inválidos recibidos.</p>;
  }

  // Filtrar las citas según el término de búsqueda
  const filteredAppointments = appointments.filter((appointment) => {
    const hasCurp = appointment.curp_p !== undefined;
    const hasMotivo = appointment.motivo_cita !== undefined;
    const hasEstado = appointment.estado_cita !== undefined;
    return (
      (hasCurp && appointment.curp_p.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (hasMotivo && appointment.motivo_cita.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (hasEstado && appointment.estado_cita.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CURP Paciente</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Cita</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula Médico</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <tr key={appointment.id_cita || index}>
                <td className="px-3 py-4 whitespace-nowrap">{appointment.curp_p}</td>
                <td className="px-3 py-4 whitespace-nowrap">{new Date(appointment.fecha_cita).toLocaleString()}</td>
                <td className="px-3 py-4 whitespace-nowrap">{appointment.cedula_m}</td>
                <td className="px-3 py-4">{appointment.motivo_cita}</td>
                <td className="px-3 py-4 whitespace-nowrap">{appointment.estado_cita}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No hay registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
