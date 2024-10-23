import React from 'react';
import { Trash2 } from 'lucide-react';

const AppointmentTable = ({ appointments, onSelect, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seleccionar</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td className="px-3 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={appointment.selected}
                  onChange={(e) => onSelect(index, e.target.checked)}
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap">{appointment.patientName}</td>
              <td className="px-3 py-4 whitespace-nowrap">{appointment.date}</td>
              <td className="px-3 py-4 whitespace-nowrap">{appointment.time}</td>
              <td className="px-3 py-4 whitespace-nowrap">{appointment.doctor}</td>
              <td className="px-3 py-4">{appointment.reason}</td>
              <td className="px-3 py-4 whitespace-nowrap">{appointment.status}</td>
              <td className="px-3 py-4 whitespace-nowrap">
                <button
                  onClick={() => onDelete(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
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