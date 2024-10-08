import React, { useState } from 'react';


const Settings = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  /*const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };*/

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div>
      {/* <div className="dropdown"> */}
        {/* <button id="ajustesBtn" onClick={toggleDropdown}>Ajustes</button> */}
      <div className='settings-content'>  
        {/* {isDropdownOpen && ( */}
        <h1>Configuración</h1>
          <div className="dropdown-content">
            <a href="#generalModal" onClick={() => openModal('generalModal')}>General</a>
            <a href="#cuentaModal" onClick={() => openModal('cuentaModal')}>Cuenta</a>
            <a href="#accesibilidadModal" onClick={() => openModal('accesibilidadModal')}>Accesibilidad</a>
            <a href="#privacidadModal" onClick={() => openModal('privacidadModal')}>Privacidad</a>
          </div>
      </div>

      {activeModal === 'generalModal' && (
        <div id="generalModal" className="modal modal-desplazado">
          <h3>Ajustes Generales</h3>
          <form>
            <label htmlFor="unidades">Unidades de medida</label>
            <select id="unidades">
              <option value="kg">Kilogramos</option>
              <option value="lb">Libras</option>
            </select>

            <label htmlFor="formato_fecha">Formato de fecha:</label>
            <select id="formato_fecha">
              <option value="dd-mm-yyyy">DD/MM/YYYY</option>
              <option value="mm-dd-yyyy">MM/DD/YYYY</option>
            </select>

            <label htmlFor="formato_hora">Formato de hora:</label>
            <select id="formato_hora">
              <option value="12hrs">12hrs</option>
              <option value="24hrs">24hrs</option>
            </select>

            <button
              className="color-scheme-toggler"
              type="button"
              aria-label="Cambiar a modo oscuro"
              onClick={toggleDarkMode}
            >
              <span className="color-scheme-toggler__icon color-scheme-toggler__icon--light" aria-hidden="true">🌝</span>
              <span className="color-scheme-toggler__icon color-scheme-toggler__icon--dark" aria-hidden="true">🌚</span>
            </button>

            <div className="modal-buttons">
              <button type="button" className="cancelar" onClick={closeModal}>Cancelar</button>
              <button type="button" className="guardar" onClick={() => alert('Cambios guardados correctamente')}>Guardar</button>
              <button type="button" className="restablecer" onClick={() => alert('Valores restablecidos a los predeterminados')}>Restablecer Valores</button>
            </div>
          </form>
        </div>
      )}


      {activeModal === 'cuentaModal' && (
        <div id="cuentaModal" className="modal modal-desplazado">
          <h3>Ajustes de Cuenta</h3>
          <div className="perfil">
            <img src="ruta" alt="Foto de perfil" />
            <div className="info">
              <h4>Nombre del Usuario</h4>
              <p>Gmail</p>
              <p>Telefono</p>
            </div>
          </div>
          <div className="modal-buttons">
            <button type="button" className="salir" onClick={closeModal}>Salir</button>
          </div>
        </div>
      )}


      {activeModal === 'accesibilidadModal' && (
        <div id="accesibilidadModal" className="modal modal-desplazado">
          <h3>Ajustes de Accesibilidad</h3>
          <h4>Texto</h4>
          <h4>Colores</h4>
          <div className="modal-buttons">
            <button type="button" className="cancelar" onClick={closeModal}>Cancelar</button>
            <button type="button" className="guardar" onClick={() => alert('Cambios guardados correctamente')}>Guardar</button>
            <button type="button" className="restablecer" onClick={() => alert('Valores restablecidos a los predeterminados')}>Restablecer Valores</button>
          </div>
        </div>
      )}


      {activeModal === 'privacidadModal' && (
        <div id="privacidadModal" className="modal modal-desplazado">
          <h3>Ajustes de Privacidad</h3>
          <div className="contenedor_p">Camara
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
          </div>
          <div className="contenedor_p">Ubicación
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
          </div>
          <div className="contenedor_p">Notificaciones
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancelar" onClick={closeModal}>Cancelar</button>
            <button type="button" className="guardar" onClick={() => alert('Cambios guardados correctamente')}>Guardar</button>
            <button type="button" className="restablecer" onClick={() => alert('Valores restablecidos a los predeterminados')}>Restablecer Valores</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
