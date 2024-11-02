import React, { useState, useEffect } from 'react';

const StaffForm = ({ staffType, selectedStaff, isEditing, onCreate, onUpdate, onCancel }) => {
  const initialState = staffType === 'pacientes'
    ? {
        nombre_p: '',
        aPaterno_p: '',
        aMaterno_p: '',
        sexo_p: '',
        curp_p: '',
        nss_p: '',
        direccion_p: '',
        ciudad_p: '',
        estado_p: '',
      }
    : {
        nombre_m: '',
        aPaterno_m: '',
        aMaterno_m: '',
        cedula_m: '',
        especialidad_m: '',
        telefono_m: '',
        eMail_m: '',
      };

  const [staff, setStaff] = useState(initialState);

  useEffect(() => {
    if (isEditing && selectedStaff) {
      setStaff({
        ...selectedStaff,
        sexo_p: selectedStaff.sexo_p === 0 ? '0' : '1',
      });
    } else {
      setStaff(initialState);
    }
  }, [selectedStaff, isEditing, staffType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate(staff);
    } else {
      onCreate(staff);
    }
    onCancel();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Editar' : 'Crear'} {staffType === 'pacientes' ? 'Paciente' : 'Médico'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {staffType === 'pacientes' ? (
          <>
            <h3 className="text-lg font-medium">Datos del Paciente</h3>
            <input
              type="text"
              name="nombre_p"
              value={staff.nombre_p}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="aPaterno_p"
              value={staff.aPaterno_p}
              onChange={handleChange}
              placeholder="Apellido Paterno"
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="aMaterno_p"
              value={staff.aMaterno_p}
              onChange={handleChange}
              placeholder="Apellido Materno"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="curp_p"
              value={staff.curp_p}
              onChange={handleChange}
              placeholder="CURP"
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="nss_p"
              value={staff.nss_p}
              onChange={handleChange}
              placeholder="NSS"
              className="border rounded p-2 w-full"
            />
            <select
              name="sexo_p"
              value={staff.sexo_p}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            >
              <option value="">Selecciona Sexo</option>
              <option value="0">Masculino</option>
              <option value="1">Femenino</option>
            </select>
            <input
              type="text"
              name="direccion_p"
              value={staff.direccion_p}
              onChange={handleChange}
              placeholder="Dirección"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="ciudad_p"
              value={staff.ciudad_p}
              onChange={handleChange}
              placeholder="Ciudad"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="estado_p"
              value={staff.estado_p}
              onChange={handleChange}
              placeholder="Estado"
              className="border rounded p-2 w-full"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium">Datos del Médico</h3>
            <input
              type="text"
              name="nombre_m"
              value={staff.nombre_m}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="aPaterno_m"
              value={staff.aPaterno_m}
              onChange={handleChange}
              placeholder="Apellido Paterno"
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="aMaterno_m"
              value={staff.aMaterno_m}
              onChange={handleChange}
              placeholder="Apellido Materno"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="cedula_m"
              value={staff.cedula_m}
              onChange={handleChange}
              placeholder="Cédula"
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="especialidad_m"
              value={staff.especialidad_m}
              onChange={handleChange}
              placeholder="Especialidad"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="telefono_m"
              value={staff.telefono_m}
              onChange={handleChange}
              placeholder="Teléfono"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              name="eMail_m"
              value={staff.eMail_m}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              className="border rounded p-2 w-full"
            />
          </>
        )}
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
          >
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
