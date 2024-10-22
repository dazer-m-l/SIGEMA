import React from 'react';

const StaffTable = ({ staffData, searchTerm, onEdit, onDelete }) => {
  // Filtrar los datos basados en el término de búsqueda
  const filteredStaff = staffData.filter(staff => {
    const searchField = staff.cedula || staff.curp || ''; // Puede ser cédula o curp
    return searchField.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido Paterno</th>
            <th className="py-2 px-4 border-b">{filteredStaff.length > 0 && filteredStaff[0].cedula ? 'Cédula' : 'CURP'}</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff, index) => (
              <tr key={staff.cedula || staff.curp || index}>
                <td className="py-2 px-4 border-b">{staff.nombre_m || staff.nombre_p}</td>
                <td className="py-2 px-4 border-b">{staff.aPaterno_m || staff.aPaterno_p}</td>
                <td className="py-2 px-4 border-b">{staff.cedula_m || staff.curp_p}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => onEdit(staff)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar este registro?');
                      if (confirmDelete) {
                        onDelete(staff.cedula || staff.curp);
                      }
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No se encontraron registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
