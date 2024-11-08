import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ selectedAppointment, isEditing, onCreate, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    curp_p: '',
    fecha_cita: '',
    cedula_m: '',
    motivo_cita: '',
    estado_cita: ''
  });

  const [curpsPacientes, setCurpsPacientes] = useState([]);
  const [cedulasMedicos, setCedulasMedicos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesResponse = await axios.get('/api/pacientes');
        if (pacientesResponse.data.success && Array.isArray(pacientesResponse.data.data)) {
          const curps = pacientesResponse.data.data.map(paciente => paciente.curp_p);
          setCurpsPacientes(curps);
        }

        const medicosResponse = await axios.get('/api/medicos');
        if (medicosResponse.data.success && Array.isArray(medicosResponse.data.data)) {
          const cedulas = medicosResponse.data.data.map(medico => medico.cedula_m);
          setCedulasMedicos(cedulas);
        }
      } catch (error) {
        console.error('Error al obtener los datos de la base de datos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEditing && selectedAppointment) {
      const fechaCita = new Date(selectedAppointment.fecha_cita);
      const formattedDateTime = `${fechaCita.getFullYear()}-${(fechaCita.getMonth() + 1).toString().padStart(2, '0')}-${fechaCita.getDate().toString().padStart(2, '0')}T${fechaCita.getHours().toString().padStart(2, '0')}:${fechaCita.getMinutes().toString().padStart(2, '0')}`;
      setFormData({
        curp_p: selectedAppointment.curp_p,
        fecha_cita: formattedDateTime,
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

    // Convertir fecha a UTC antes de enviar
    const appointmentData = {
      ...formData,
      fecha_cita: new Date(formData.fecha_cita).toISOString()
    };

    if (isEditing) {
      onUpdate({ ...selectedAppointment, ...appointmentData });
    } else {
      onCreate(appointmentData);
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2">CURP Paciente</label>
        <select
          name="curp_p"
          value={formData.curp_p}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        >
          <option value="">Seleccionar CURP</option>
          {curpsPacientes.map((curp, index) => (
            <option key={index} value={curp}>{curp}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2">Fecha de Cita</label>
        <input
          type="datetime-local"
          name="fecha_cita"
          value={formData.fecha_cita}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Cédula Médico</label>
        <select
          name="cedula_m"
          value={formData.cedula_m}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        >
          <option value="">Seleccionar Cédula</option>
          {cedulasMedicos.map((cedula, index) => (
            <option key={index} value={cedula}>{cedula}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2">Motivo</label>
        <input
          type="text"
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
          <option value="">Seleccionar Estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md text-white bg-gray-400 hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600"
        >
          {isEditing ? 'Actualizar Cita' : 'Agregar Cita'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
