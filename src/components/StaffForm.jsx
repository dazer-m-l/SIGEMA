import React, { useState, useEffect } from 'react';

const StaffForm = ({ staffType, selectedStaff, isEditing, onCreate, onUpdate, onCancel }) => {
  const [staff, setStaff] = useState({ nombre: '', apellido: '', cedula: '', curp: '' });

  useEffect(() => {
    if (isEditing && selectedStaff) {
      setStaff(selectedStaff);
    } else {
      setStaff({ nombre: '', apellido: '', cedula: '', curp: '' });
    }
  }, [selectedStaff, isEditing]);

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
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
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        name="nombre"
        value={staff.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="apellido"
        value={staff.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
      />
      {staffType === 'medicos' ? (
        <input
          type="text"
          name="cedula"
          value={staff.cedula}
          onChange={handleChange}
          placeholder="Cédula"
          required
        />
      ) : (
        <input
          type="text"
          name="curp"
          value={staff.curp}
          onChange={handleChange}
          placeholder="CURP"
          required
        />
      )}
      <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">
        {isEditing ? 'Actualizar' : 'Crear'}
      </button>
      <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 rounded">
        Cancelar
      </button>
    </form>
  );
};

export default StaffForm;
