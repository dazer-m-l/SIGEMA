import React, { useState, useEffect } from 'react';

const AppointmentForm = ({ selectedAppointment, isEditing, onCreate, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    curp_p: '',
    fecha_cita: '',
    cedula_m: '',
    motivo_cita: '',
    estado_cita: ''
  });

  useEffect(() => {
    if (isEditing && selectedAppointment) {
      setFormData({
        curp_p: selectedAppointment.curp_p,
        fecha_cita: new Date(selectedAppointment.fecha_cita).toISOString().substring(0, 10),
        cedula_m: selectedAppointment.cedula_m,
        motivo_cita: selectedAppointment.motivo_cita,
        estado_cita: selectedAppointment.estado_cita,
      });
    } else {
      setFormData({
        curp_p: '',
        fecha_cita: '',
        cedula_m: '',
        motivo_cita: '',
        estado_cita: ''
      });
    }
  }, [isEditing, selectedAppointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate({ ...selectedAppointment, ...formData }); // Incluyendo el ID de cita
    } else {
      onCreate(formData);
    }
    onCancel(); // Cerrar el modal después de la creación o actualización
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2">CURP Paciente</label>
        <input
          type="text"
          name="curp_p"
          value={formData.curp_p}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Fecha de Cita</label>
        <input
          type="date"
          name="fecha_cita"
          value={formData.fecha_cita}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Cédula Médico</label>
        <input
          type="text"
          name="cedula_m"
          value={formData.cedula_m}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Motivo</label>
        <textarea
          name="motivo_cita"
          value={formData.motivo_cita}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Estado</label>
        <select
          name="estado_cita"
          value={formData.estado_cita}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        >
          <option value="">Seleccionar</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="CONFIRMADA">Confirmada</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          {isEditing ? 'Actualizar Cita' : 'Crear Cita'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
