import React from 'react';

const StaffTable = ({ staffData, staffType, searchTerm, onEdit, onDelete }) => {
  const filteredData = (staffData || []).filter((staff) => {
    if (!staff) {
      console.warn('Staff is undefined:', staff);
      return false;
    }
    const hasCurp = staff.curp_p !== undefined;
    const hasNombre = staff.nombre_p !== undefined;
    const hasCedula = staff.cedula_m !== undefined;
    const hasNombreMedico = staff.nombre_m !== undefined;

    return staffType === 'pacientes'
      ? (hasCurp && staff.curp_p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hasNombre && staff.nombre_p.toLowerCase().includes(searchTerm.toLowerCase()))
      : (hasCedula && staff.cedula_m.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hasNombreMedico && staff.nombre_m.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-4 text-center">Nombre</th>
            <th className="py-3 px-4 text-center">Apellido Paterno</th>
            <th className="py-3 px-4 text-center">Apellido Materno</th>
            <th className="py-3 px-4 text-center">
              {staffType === 'pacientes' ? 'CURP' : 'Cédula'}
            </th>
            <th className="py-3 px-4 text-center">
              {staffType === 'pacientes' ? 'NSS' : 'Especialidad'}
            </th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredData.length > 0 ? (
            filteredData.map((staff, index) => (
              <tr
                key={staff.curp_p || staff.cedula_m || index}
                className="border-b border-gray-200 hover:bg-gray-100 text-center transition duration-150"
              >
                <td className="py-3 px-4">{staff.nombre_p || staff.nombre_m || 'N/A'}</td>
                <td className="py-3 px-4">{staff.aPaterno_p || staff.aPaterno_m || 'N/A'}</td>
                <td className="py-3 px-4">{staff.aMaterno_p || staff.aMaterno_m || 'N/A'}</td>
                <td className="py-3 px-4">
                  {staffType === 'pacientes' ? staff.curp_p || 'N/A' : staff.cedula_m || 'N/A'}
                </td>
                <td className="py-3 px-4">
                  {staffType === 'pacientes' ? staff.nss_p || 'N/A' : staff.especialidad_m || 'N/A'}
                </td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => onEdit(staff)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
                  >
                    <i className="fas fa-edit mr-1"></i> Editar
                  </button>
                  <button
                    onClick={() => onDelete(staffType === 'medicos' ? staff.cedula_m : staff.curp_p)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Borrar
                  </button>
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

export default StaffTable;
