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
        // Obtener las CURPs de los pacientes
        const pacientesResponse = await axios.get('/api/pacientes');
        console.log('Respuesta de la API de pacientes:', pacientesResponse.data);

        if (pacientesResponse.data.success && Array.isArray(pacientesResponse.data.data)) {
          const curps = pacientesResponse.data.data.map(paciente => paciente.curp_p);
          setCurpsPacientes(curps);
        } else {
          console.error('La respuesta de la API de pacientes no es válida:', pacientesResponse.data);
        }

        // Obtener las cédulas de los médicos
        const medicosResponse = await axios.get('/api/medicos');
        console.log('Respuesta de la API de médicos:', medicosResponse.data);

        if (medicosResponse.data.success && Array.isArray(medicosResponse.data.data)) {
          const cedulas = medicosResponse.data.data.map(medico => medico.cedula_m);
          setCedulasMedicos(cedulas);
        } else {
          console.error('La respuesta de la API de médicos no es válida:', medicosResponse.data);
        }
      } catch (error) {
        console.error('Error al obtener los datos de la base de datos:', error);
      }
    };

    fetchData();
  }, []);

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
      onUpdate({ ...selectedAppointment, ...formData });
    } else {
      onCreate(formData);
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
