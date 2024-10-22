import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffTable from '../components/StaffTable';
import StaffForm from '../components/StaffForm';

const Staff = () => {
  const [staffType, setStaffType] = useState('medicos'); 
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch staff data (GET)
  const fetchStaffData = async () => {
    try {
      const endpoint = staffType === 'medicos' ? '/api/medicos' : '/api/pacientes';
      const response = await axios.get(endpoint);
      setStaffData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [staffType]);

  // Handle staff creation (POST)
  const handleCreateStaff = async (newStaff) => {
    try {
      const endpoint = staffType === 'medicos' ? '/api/medicos' : '/api/pacientes';
      await axios.post(endpoint, newStaff);
      fetchStaffData(); 
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  // Handle staff update (PUT)
  const handleUpdateStaff = async (updatedStaff) => {
    try {
      const endpoint = staffType === 'medicos' ? `/api/medicos/${updatedStaff.cedula}` : `/api/pacientes/${updatedStaff.curp}`;
      await axios.put(endpoint, updatedStaff);
      fetchStaffData();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  // Handle staff deletion (DELETE)
  const handleDeleteStaff = async (id) => {
    try {
      const endpoint = staffType === 'medicos' ? `/api/medicos/${id}` : `/api/pacientes/${id}`;
      await axios.delete(endpoint);
      fetchStaffData();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <p className="text-xl font-bold mb-4">
        {staffType === 'medicos' ? 'Gestión de Médicos' : 'Gestión de Pacientes'}
      </p>

      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="staffType"
              value="medicos"
              checked={staffType === 'medicos'}
              onChange={() => setStaffType('medicos')}
            />
            <span className="ml-2">Ver Médicos</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="staffType"
              value="pacientes"
              checked={staffType === 'pacientes'}
              onChange={() => setStaffType('pacientes')}
            />
            <span className="ml-2">Ver Pacientes</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-1/3"
          placeholder={staffType === 'medicos' ? 'Buscar por cédula' : 'Buscar por CURP'}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <StaffTable
        staffData={staffData}
        searchTerm={searchTerm}
        onEdit={(staff) => {
          setSelectedStaff(staff);
          setIsEditing(true);
        }}
        onDelete={handleDeleteStaff}
      />

      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => {
            setSelectedStaff(null);
            setIsEditing(false);
            alert('Formulario para agregar nuevo médico/paciente');
          }}
        >
          Crear Nuevo
        </button>
      </div>

      {isEditing && (
        <StaffForm
          staffType={staffType}
          selectedStaff={selectedStaff}
          onCreate={handleCreateStaff}
          onUpdate={handleUpdateStaff}
          onCancel={() => {
            setSelectedStaff(null);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default Staff;
