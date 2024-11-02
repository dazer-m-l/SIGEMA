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
  const [showModal, setShowModal] = useState(false);

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

  const handleCreateStaff = async (newStaff) => {
    try {
      const endpoint = staffType === 'medicos' ? '/api/medicos' : '/api/pacientes';
      await axios.post(endpoint, newStaff);
      fetchStaffData(); 
      setShowModal(false);
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const handleUpdateStaff = async (updatedStaff) => {
    try {
      const endpoint = staffType === 'medicos' ? `/api/medicos/${updatedStaff.cedula}` : `/api/pacientes/${updatedStaff.curp}`;
      await axios.put(endpoint, updatedStaff);
      fetchStaffData();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

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
    <div className="p-4">
      <p className="text-lg font-bold mb-4">{staffType === 'medicos' ? 'Gestión de Médicos' : 'Gestión de Pacientes'}</p>
      <div className="flex justify-center items-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="staffType"
            value="medicos"
            checked={staffType === 'medicos'}
            onChange={() => setStaffType('medicos')}
            className="mr-2"
          />
          Médicos
        </label>
        <label>
          <input
            type="radio"
            name="staffType"
            value="pacientes"
            checked={staffType === 'pacientes'}
            onChange={() => setStaffType('pacientes')}
            className="mr-2"
          />
          Pacientes
        </label>
      </div>

      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder={staffType === 'medicos' ? 'Buscar por Cédula' : 'Buscar por CURP'}
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 m-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            setSelectedStaff(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear Nuevo
        </button>
      </div>

      <StaffTable
        staffData={staffData}
        staffType={staffType}
        searchTerm={searchTerm}
        onEdit={(staff) => {
          setSelectedStaff(staff);
          setIsEditing(true);
          setShowModal(true);
        }}
        onDelete={handleDeleteStaff}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Registro' : 'Crear Nuevo Registro'}</h2>
            <StaffForm
              staffType={staffType}
              selectedStaff={selectedStaff}
              isEditing={isEditing}
              onCreate={handleCreateStaff}
              onUpdate={handleUpdateStaff}
              onCancel={() => setShowModal(false)}
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
