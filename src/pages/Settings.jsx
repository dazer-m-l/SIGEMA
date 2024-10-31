import React, { useState } from 'react';
import "./settinf.css"; // Corregido el nombre del archivo de CSS

const Settings = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (  
    <div className="settings-container relative flex max-w-xs px-6 py-2">
      {/* Contenido de la configuración */}
      <div className={`settings-content shadow-md ring-0 z-10 w-full bg-white rounded-lg p-2 ring-gray-200 transition-opacity duration-300 ${activeModal ? 'opacity-50' : ''}`}>
        <div className="dropdown-content text-sm text-center p-3">
          <h1 className='text-2xl font-bold mb-4 text-center'>Configuración</h1>
          <ul className='space-y-4'>
            <li><a className="block text-sm font-medium" href="#generalModal" onClick={() => openModal('generalModal')}>General</a></li>
            <hr className="border-gray-400 mb-4" />
            <li><a className="block text-sm font-medium" href="#cuentaModal" onClick={() => openModal('cuentaModal')}>Cuenta</a></li>
            <hr className="border-gray-400 mb-4" />
            <li><a className="block text-sm font-medium" href="#accesibilidadModal" onClick={() => openModal('accesibilidadModal')}>Accesibilidad</a></li>
            <hr className="border-gray-400 mb-4" />
            <li><a className="block text-sm font-medium" href="#privacidadModal" onClick={() => openModal('privacidadModal')}>Privacidad</a></li>
          </ul>
        </div>
      </div>

      {/* Modales */}
      {activeModal === 'generalModal' && (
        <div id="generalModal" className="modal modal-desplazado mx-auto p-4 bg-white shadow-lg rounded-lg text-center w-64 absolute ring-0">
          <h3 className='text-lg font-semibold mb-4'>Ajustes Generales</h3>
          <form>
            <label className='block text-sm mb-2' htmlFor="unidades">Unidades de medida</label>
            <select id="unidades" className='w-full p-2 mb-4 border rounded'>
              <option value="kg">Kilogramos</option>
              <option value="lb">Libras</option>
            </select>
            <label className="block text-sm mb-2" htmlFor="formato_fecha">Formato de fecha:</label>
            <select id="formato_fecha" className='w-full mb-4 border rounded'>
              <option value="dd-mm-yyyy">DD/MM/YYYY</option>
              <option value="mm-dd-yyyy">MM/DD/YYYY</option>
            </select>
            <label className='block text-sm mb-2' htmlFor="formato_hora">Formato de hora:</label>
            <select id="formato_hora" className='w-full p-2 mb-4 border rounded'>
              <option value="12hrs">12hrs</option>
              <option value="24hrs">24hrs</option>
            </select>
            <label className='block text-sm mb-2'>Cambiar Tema:</label>
            <button className='color-scheme-toggler' type='button' onClick={toggleDarkMode}>
              <span role="img" aria-label="modo claro" className="color-scheme-toggler" aria-hidden="true">🌝</span>
              <span role='img' aria-label='modo oscuro' className="color-scheme-toggler" aria-hidden="true">🌚</span>
            </button>
            <div className="modal-buttons">
              <button type="button" className="cancelar px-4 py-2 bg-red-400 rounded" onClick={closeModal}>Cancelar</button>
              <button type="button" className="guardar px-4 py-2 bg-blue-400 rounded" onClick={() => alert('Cambios guardados correctamente')}>Guardar</button>
              <button type="button" className="restablecer px-4 py-2 bg-gray-400 rounded" onClick={() => alert('Valores restablecidos a los predeterminados')}>Restablecer Valores</button>
            </div>
          </form>
        </div>
      )}

      {activeModal === 'cuentaModal' && (
        <div id="cuentaModal" className="modal modal-desplazado mx-auto p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className='text-lg font-semibold mb-4'>Ajustes de Cuenta</h3>
          <div className="perfil flex flex-col items-center">
            <img src="" alt="Foto de perfil" className='w-16 h-16 rounded-full mb-4'/>
            <div className="info text-center">
              <div className="info text-sm font-mono">Nombre del Usuario</div>
              <p className='text-xs font-mono'>Correo electrónico</p>
              <p className='text-xs font-mono'>Teléfono</p>
            </div>
          </div>
          <div className="modal-buttons mt-4">
            <button type="button" className="salir px-4 py-2 bg-red-400 rounded" onClick={closeModal}>Salir</button>
          </div>
        </div>
      )}

      {activeModal === 'accesibilidadModal' && (
        <div id="accesibilidadModal" className="modal modal-desplazado mx-auto p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className='text-lg font-semibold mb-4'>Ajustes de Accesibilidad</h3>
          <p className='text-sm'>Opciones de texto y colores accesibles</p>
          <div className="modal-buttons mt-4">
            <button type="button" className="cancelar px-4 py-2 bg-red-400 rounded" onClick={closeModal}>Cancelar</button>
            <button type="button" className="guardar px-4 py-2 bg-blue-400 rounded" onClick={() => alert('Cambios guardados correctamente')}>Guardar</button>
            <button type="button" className="restablecer px-4 py-2 bg-gray-400 rounded" onClick={() => alert('Valores restablecidos a los predeterminados')}>Restablecer Valores</button>
          </div>
        </div>
      )}

      {activeModal === 'privacidadModal' && (
        <div id="privacidadModal" className="modal modal-desplazado mx-auto p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className='text-lg font-semibold mb-4'>Ajustes de Privacidad</h3>
          <div className="contenedor_p flex items-center justify-between mb-4"><span>Cámara</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="contenedor_p flex items-center justify-between mb-4"><span>Ubicación</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="contenedor_p flex items-center justify-between mb-4"><span>Notificaciones</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancelar px-4 py-2 bg-red-400 rounded" onClick={closeModal}>Cancelar</button>
            <button type="button" className="guardar px-4 py-2 bg-blue-400 rounded" onClick={() => alert('Cambios guardados correctamente')}>Guardar</button>
            <button type="button" className="restablecer px-4 py-2 bg-gray-400 rounded" onClick={() => alert('Valores restablecidos a los predeterminados')}>Restablecer Valores</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
