import React from 'react';

const History = () => {
  // const [formData] = useState({});
  return (
    <div>
     
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Historial Médico</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="nombre"
                // value={formData.nombre}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Apellido Paterno</label>
              <input
                type="text"
                name="apellidoPaterno"
                // value={formData.apellidoPaterno}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apellido Paterno"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Apellido Materno</label>
              <input
                type="text"
                name="apellidoMaterno"
                // value={formData.apellidoMaterno}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apellido Materno"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                // value={formData.fechaNacimiento}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                // value={formData.telefono}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Teléfono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Fecha de Consulta</label>
              <input
                type="date"
                name="fechaConsulta"
                // value={formData.fechaConsulta}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Enfermedades</label>
              <input
                type="text"
                name="enfermedades"
                // value={formData.enfermedades}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enfermedades"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Alergias</label>
              <input
                type="text"
                name="alergias"
                // value={formData.alergias}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Alergias"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Operaciones</label>
              <input
                type="text"
                name="operaciones"
                // value={formData.operaciones}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Operaciones"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Tipo de Sangre</label>
              <select
                name="tipoSangre"
                // value={formData.tipoSangre}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Medicamento de Consulta</label>
              <input
                type="text"
                name="medicamentoConsulta"
                // value={formData.medicamentoConsulta}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Medicamento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Exámenes de Consulta</label>
              <input
                type="text"
                name="examenesConsulta"
                // value={formData.examenesConsulta}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Exámenes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">CURP</label>
              <input
                type="text"
                name="curp"
                // value={formData.curp}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CURP"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Cédula</label>
              <input
                type="text"
                name="cedula"
                // value={formData.cedula}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cédula"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-6">
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default History;
