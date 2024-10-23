import React, { useState, useEffect, useRef } from 'react';

const AppointmentForm = ({ onSubmit, appointmentToEdit, onClose, doctors }) => {
  const [appointment, setAppointment] = useState(
    appointmentToEdit || {
      patientName: '',
      patientId: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
      status: 'Pendiente',
    }
  );

  const modalRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(appointment);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {appointmentToEdit ? 'Actualizar Cita' : 'Agendar Cita'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
              Nombre del Paciente
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={appointment.patientName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
              Identificación del Paciente
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={appointment.patientId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Fecha de la Cita
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointment.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Hora de la Cita
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={appointment.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
              Médico Asignado
            </label>
            <select
              id="doctor"
              name="doctor"
              value={appointment.doctor}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Seleccione un médico</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Motivo de la Cita
            </label>
            <textarea
              id="reason"
              name="reason"
              value={appointment.reason}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Estado de la Cita
            </label>
            <select
              id="status"
              name="status"
              value={appointment.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {appointmentToEdit ? 'Actualizar Cita' : 'Agendar Cita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;