import React, { useState, useEffect } from 'react';

const InputField = ({ label, name, value, onChange, error, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const StaffForm = ({ staffType, selectedStaff, isEditing, onCreate, onUpdate, onCancel }) => {
  const initialState = staffType === 'pacientes' ? {
    nombre_p: '',
    aPaterno_p: '',
    aMaterno_p: '',
    sexo_p: '',
    curp_p: '',
    direccion_p: '',
    ciudad_p: '',
    estado_p: '',
    nss_p: '',
    telefono_p: '',
    eMail_p: '',
  } : {
    nombre_m: '',
    aPaterno_m: '',
    aMaterno_m: '',
    cedula_m: '',
    especialidad_m: '',
    telefono_m: '',
    eMail_m: '',
    horarios: [{ id_horario: null, dia_semana: '', hora_inicio: '', hora_fin: '' }],
  };

  const [staff, setStaff] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && selectedStaff) {
      setStaff({
        ...selectedStaff,
        sexo_p: selectedStaff?.sexo_p === 0 ? '0' : '1',
        horarios: selectedStaff.horarios || [{ id_horario: null, dia_semana: '', hora_inicio: '', hora_fin: '' }],
      });
    } else {
      setStaff(initialState);
    }
  }, [selectedStaff, isEditing, staffType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('horarios')) {
      const index = parseInt(name.split('-')[1], 10);
      const field = name.split('-')[2];
      const newHorarios = [...staff.horarios];
      newHorarios[index][field] = value;
      setStaff({ ...staff, horarios: newHorarios });
    } else {
      setStaff({ ...staff, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleAddHorario = () => {
    // Obtener el último ID de horario existente
    const lastId = staff.horarios.reduce((maxId, horario) => Math.max(maxId, horario.id_horario || 0), 0);
    
    setStaff({
      ...staff,
      horarios: [
        ...staff.horarios,
        { id_horario: lastId + 1, dia_semana: '', hora_inicio: '', hora_fin: '' }, // Asignar nuevo ID
      ],
    });
  };

  const handleRemoveHorario = (index) => {
    const newHorarios = [...staff.horarios];
    newHorarios.splice(index, 1);
    setStaff({ ...staff, horarios: newHorarios });
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(staff).forEach((key) => {
      if (!staff[key] && key !== 'horarios') newErrors[key] = 'Este campo es obligatorio';
    });

    staff.horarios.forEach((horario, index) => {
      if (!horario.dia_semana) newErrors[`horarios-${index}-dia`] = 'El día es obligatorio';
      if (!horario.hora_inicio) newErrors[`horarios-${index}-hora_inicio`] = 'La hora de inicio es obligatoria';
      if (!horario.hora_fin) newErrors[`horarios-${index}-hora_fin`] = 'La hora de fin es obligatoria';
      else if (horario.hora_inicio && horario.hora_fin && horario.hora_inicio >= horario.hora_fin) {
        newErrors[`horarios-${index}-hora_inicio`] = 'La hora de inicio debe ser menor que la hora de fin';
      }
    });

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Enviar los datos al backend
      if (isEditing) {
        // Actualizar médico y sus horarios
        onUpdate(staff); // Aquí se envían todos los datos incluyendo horarios
      } else {
        // Crear nuevo médico con sus horarios
        onCreate(staff); // Aquí se envían todos los datos incluyendo horarios
      }
      
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-screen-sm w-full max-h-screen overflow-auto p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isEditing ? 'Editar' : 'Crear'} {staffType === 'pacientes' ? 'Paciente' : 'Médico'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {staffType === 'pacientes' ? (
            <>
              <InputField label="Nombre" name="nombre_p" value={staff.nombre_p} onChange={handleChange} error={errors.nombre_p} />
              <InputField label="Apellido Paterno" name="aPaterno_p" value={staff.aPaterno_p} onChange={handleChange} error={errors.aPaterno_p} />
              <InputField label="Apellido Materno" name="aMaterno_p" value={staff.aMaterno_p} onChange={handleChange} error={errors.aMaterno_p} />
              <InputField label="Sexo" name="sexo_p" value={staff.sexo_p} onChange={handleChange} error={errors.sexo_p} />
              <InputField label="CURP" name="curp_p" value={staff.curp_p} onChange={handleChange} error={errors.curp_p} />
              <InputField label="Dirección" name="direccion_p" value={staff.direccion_p} onChange={handleChange} error={errors.direccion_p} />
              <InputField label="Ciudad" name="ciudad_p" value={staff.ciudad_p} onChange={handleChange} error={errors.ciudad_p} />
              <InputField label="Estado" name="estado_p" value={staff.estado_p} onChange={handleChange} error={errors.estado_p} />
              <InputField label="NSS" name="nss_p" value={staff.nss_p} onChange={handleChange} error={errors.nss_p} />
              <InputField label="Teléfono" name="telefono_p" value={staff.telefono_p} onChange={handleChange} error={errors.telefono_p} />
              <InputField label="Correo Electrónico" name="eMail_p" value={staff.eMail_p} onChange={handleChange} error={errors.eMail_p} />
            </>
          ) : (
            <>
              <InputField label="Nombre" name="nombre_m" value={staff.nombre_m} onChange={handleChange} error={errors.nombre_m} />
              <InputField label="Apellido Paterno" name="aPaterno_m" value={staff.aPaterno_m} onChange={handleChange} error={errors.aPaterno_m} />
              <InputField label="Apellido Materno" name="aMaterno_m" value={staff.aMaterno_m} onChange={handleChange} error={errors.aMaterno_m} />
              <InputField label="Cédula" name="cedula_m" value={staff.cedula_m} onChange={handleChange} error={errors.cedula_m} />
              <InputField label="Especialidad" name="especialidad_m" value={staff.especialidad_m} onChange={handleChange} error={errors.especialidad_m} />
              <InputField label="Teléfono" name="telefono_m" value={staff.telefono_m} onChange={handleChange} error={errors.telefono_m} />
              <InputField label="Correo Electrónico" name="eMail_m" value={staff.eMail_m} onChange={handleChange} error={errors.eMail_m} />

              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Horarios de Médico</h2>
              {staff.horarios.map((horario, index) => (
                <div key={`horario-${index}`} className="flex space-x-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2"> Día de la semana 
                    <select 
                      name={`horarios-${index}-dia_semana`} 
                      value={horario.dia_semana}
                      onChange={(e) => handleChange(e)} 
                      className="block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Seleccionar</option>
                      {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
                        <option key={`dia-${dia.toLowerCase()}`} value={dia.toLowerCase()}>{dia}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2"> Hora de Inicio 
                    <input 
                      type="time"
                      name={`horarios-${index}-hora_inicio`} 
                      value={horario.hora_inicio}
                      onChange={(e) => handleChange(e)} 
                      className="block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </label>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2"> Hora de Fin 
                    <input 
                      type="time"
                      name={`horarios-${index}-hora_fin`} 
                      value={horario.hora_fin}
                      onChange={(e) => handleChange(e)} 
                      className="block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </label>
                  {/* Aquí podrías incluir un campo para id_horario si es necesario */}
                  {horario.id_horario && (
                    <input type='hidden' name={`horarios-${index}-id_horario`} value={`${horario.id_horario}`} />
                  )}
                  <button type="button" onClick={() => handleRemoveHorario(index)} className="text-red-500">Remover</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddHorario()} className="text-blue-500">Agregar Horario</button>
            </>
          )}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => onCancel()} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className={`bg-blue-${isEditing ? '500' : '600'} text-white px-4 py-2 rounded`}>
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;