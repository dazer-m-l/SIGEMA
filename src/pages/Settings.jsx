  import React, { useEffect, useState } from 'react';
  import "../styles/settings.css";
  import Swal from 'sweetalert2';
  import axios from 'axios';
import { strong } from 'framer-motion/client';
// import { formatoFecha } from '../utils/formatDate';
  
  
// import { title } from 'framer-motion/m';


  // import { settings } from ''; 

  const Settings = () => {
    const [formatoHora, setFormatoHora] = useState(localStorage.getItem("formatoHora") || "24hrs");
  const [formatoFecha, setFormatoFecha] = useState(localStorage.getItem("formatoFecha") || "dd-mm-yyyy");

  // Guardar el formato de fecha seleccionado en localStorage
  const handleFormatoFechaChange = (e) => {
    const nuevoFormato = e.target.value;
    setFormatoFecha(nuevoFormato);
    localStorage.setItem("formatoFecha", nuevoFormato);
  };

  // Guardar el formato de hora seleccionado en localStorage
  const handleFormatoHoraChange = (e) => {
    const nuevoFormato = e.target.value;
    setFormatoHora(nuevoFormato);
    localStorage.setItem("formatoHora", nuevoFormato);
  };
    
//       const [fechaActual, setFechaActual] = useState(new Date());
  
    const [activeModal, setActiveModal] = useState(null);
//     // const [formatoFecha, setFormatoFecha] = useState("dd-mm-yyyy");
//     const [formatoHora, setFormatoHora] = useState("24hrs");
//     // const fechaFormateada = formatoFecha(fecha);

    // const [isDarkTheme, setIsDarkThexme] = useState(localStorage.getItem('theme') === 'dark' || false);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
      return localStorage.getItem('theme') === 'dark';
    });
    
    const [imagePreview, setImagePreview] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = useState('');
    const [fontSize, setFontSize] = useState(16); // Tamaño in1|icial de fuente
    const increaseFontSize = () => setFontSize(prev => prev < 24 ? prev + 2 : prev);
    const decreaseFontSize = () => setFontSize(prev => prev > 12 ? prev - 2 : prev);
    // Ejemplo de definición
// const setFormatoFecha = (nuevoFormato) => {
//   console.log(`Formato cambiado a: ${nuevoFormato}`);
  // Lógica para cambiar el formato
// };

// const handleFormatoFechaChange = (e) => {
//   const nuevoFormato = e.target.value;
//   setFormatoFecha(nuevoFormato);
//   localStorage.setItem("formatoFecha", nuevoFormato);
// };


    const modalWidth = '500px';
    const resetFontSize = () => {
      setFontSize(16); 
    };
    const handleFontSizeChange = (event) => {
      setFontSize(event.target.value);
    };
    useEffect(() => {
      document.body.style.fontSize = `${fontSize}px`;
      localStorage.setItem("fontSize", fontSize);
    }, [fontSize]);
    
   
    //  ////////////////////////////////
   useEffect (() =>{
    const userData = {
      email: 'usuario@gmail.com',  // Correo del usuario (lo obtienes de la sesión o backend)
      profileImage: '/path/to/old_image.jpg', // Ruta de la imagen de perfil guardada en el servidor
    };

    setEmail(userData.email); // Guardamos el correo del usuario
    setImagePreview(userData.profileImage); // Establecemos la imagen actual (si existe)
  }, []);

  useEffect(() => {
    const savedFontSize = parseInt(localStorage.getItem("fontSize"), 10) || 16;
    const savedFormatoFecha = localStorage.getItem("formatoFecha") || "dd-mm-yyyy";
    const savedFormatoHora = localStorage.getItem("formatoHora") || "24hrs";
    const savedTheme = localStorage.getItem("theme") || "light";
  
    setFontSize(savedFontSize);
    setFormatoFecha(savedFormatoFecha);
    setFormatoHora(savedFormatoHora);
    setIsDarkTheme(savedTheme === "dark");
  
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  
    document.body.style.fontSize = `${savedFontSize}px`;
  }, []);
      


    
    const openModal = (modal) => setActiveModal(modal);
    const closeModal = () => setActiveModal(null);
   
    
    const toggleTheme = () => {
      const newTheme = !isDarkTheme ? 'dark' : 'light';
      setIsDarkTheme(!isDarkTheme);
      document.body.classList.toggle('dark-mode', !isDarkTheme);
      localStorage.setItem('theme', newTheme);
    };
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'dark';
    setIsDarkTheme(savedTheme);

//     const savedFontSize = parseInt(localStorage.getItem('fontSize'), 10) || 16;
//     setFontSize(savedFontSize);

//     // const savedFormatoFecha = localStorage.getItem('formatoFecha') || "dd-mm-yyyy";
//     // setFormatoFecha(savedFormatoFecha);

//     const savedFormatoHora = localStorage.getItem('formatoHora') || "24hrs";
//     setFormatoHora(savedFormatoHora);

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setImagePreview(savedImage);
  }, []);

//   // useEffect(() => {
//   //   document.body.style.fontSize = `${fontSize}px`; // Aplica el tamaño global
//   // }, [fontSize]);
//   // useEffect(() => {
//   //   const savedFontSize = parseInt(localStorage.getItem('fontSize'), 10);
//   //   if (savedFontSize) setFontSize(savedFontSize);
//   // }, []);

//   // useEffect(() => {
//   //   const savedTheme = localStorage.getItem('theme');
//   //   if (savedTheme === 'dark') {
//   //     setIsDarkTheme(true);
//   //     document.body.classList.add('dark-mode');
//   //   } else {
//   //     setIsDarkTheme(false);
//   //     document.body.classList.remove('dark-mode');
//   //   }
//   // }, []);
// // perfil imagen
  

const handleGuardar = () => {
// //   localStorage.setItem('formatoFecha', formatoFecha);
// //   localStorage.setItem('formatoHora', formatoHora);

  if (profileImage) {
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('profileImage', reader.result); // Imagen en base64
      Swal.fire({
        title: '¡Guardado!',
        text: 'Los cambios han sido guardados exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => closeModal());
    };
    reader.readAsDataURL(profileImage);
  } else {
    Swal.fire({
      title: 'Sin Cambios en la Imagen',
      text: 'No seleccionaste ninguna imagen para guardar.',
      icon: 'info',
      confirmButtonText: 'Entendido',
    });
  }
};
// // Función para guardar cambios generales
const guardarCambiosGenerales = () => {
  // Guardar formato de fecha y hora en localStorage
  localStorage.setItem('formatoFecha', formatoFecha);
  localStorage.setItem('formatoHora', formatoHora);

  // Mostrar alerta para cambios generales
  Swal.fire({
    title: '¡Cambios guardados!',
    text: 'Se guardaron correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
  });
};
// const formatoFecha = (fecha, formato) => {
//   const date = new Date(fecha);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();

//   switch (formato) {
//     case 'dd-mm-yyyy':
//       return `${day}-${month}-${year}`;
//     case 'yyyy-mm-dd':
//       return `${year}-${month}-${day}`;
//     case 'mm-dd-yyyy':
//       return `${month}-${day}-${year}`;
//     default:
//       return fecha; // Retorna la fecha original si no se reconoce el formato
//   }
// };




// // Función para guardar la imagen en la sección de cuenta
const guardarImagenCuenta = () => {
  // Verificar si hay una imagen seleccionada
  if (profileImage) {
    // Si hay imagen, convertirla a base64 y guardarla
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('profileImage', reader.result); // Guardar imagen en base64
      Swal.fire({
        title: '¡Imagen guardada!',
        text: 'La imagen de perfil se ha guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      setActiveModal(null); // Cerrar modal
    };
    reader.readAsDataURL(profileImage);
  } else {
    // Si no hay imagen seleccionada
    Swal.fire({
      title: 'Sin imagen asignada',
      text: 'No se seleccionó ninguna imagen para guardar.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }
};



const handleImageUpdate = async () => {
  if (!profileImage) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Selecciona una imagen antes de intentar actualizarla.',
      confirmButtonColor: '#d33',
    });
  }

  try {
    await axios.put(`/pacientes/${curp_p}/perfil`, { imagen_perfil: profileImage });
    Swal.fire({
      icon: 'success',
      title: 'Imagen actualizada',
      text: 'Tu imagen de perfil ha sido actualizada correctamente.',
      confirmButtonColor: '#3085d6',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar',
      text: 'Ocurrió un error al actualizar la imagen. Inténtalo nuevamente.',
      confirmButtonColor: '#d33',
    });
  }
};

      
  
  
const handleRestablecer = () => {
  Swal.fire({
    icon: 'warning',
    title: '¿Restablecer Valores?',
    text: 'Esto eliminará todos los ajustes personalizados.',
    showCancelButton: true,
    confirmButtonText: 'Sí, restablecer',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      setFormatoFecha("dd-mm-yyyy");
      setFormatoHora("24hrs");
      setProfileImage(null);
      setImagePreview(null);
      setFontSize(16);
      setIsDarkTheme(false);

      localStorage.clear();
      Swal.fire('Restablecido', 'Los valores han sido restablecidos correctamente.', 'info');
    }
  });
};
  // guardado de cambio de tamaño de letra
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);
// recuperaccion de tamaño de letra
  useEffect(() => {
    const savedFontSize = parseInt(localStorage.getItem('fontSize'), 10);
    if (savedFontSize) setFontSize(savedFontSize);
  }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       setProfileImage(file);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // useEffect(() => {
  //   document.body.style.fontSize = `${fontSize}px`;
  //   localStorage.setItem('fontSize', fontSize);
  // }, [fontSize]);




  
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
              <li><a className="block text-sm font-medium" href="#acercaModal" onClick={() => openModal('acercaModal')}>Acerca de</a></li>
            </ul>
          </div>
        </div>

        {/* Modales */}
        {activeModal === 'generalModal' && (
          <div id="generalModal" className="modal modal-desplazado mx-auto p-4 bg-white shadow-lg rounded-lg text-center w-64 absolute ring-0">
            <h3 className='text-lg font-semibold mb-4'>Ajustes Generales</h3>
            <form>
              {/* <label className='block text-sm mb-2' htmlFor="unidades">Unidades de medida</label> */}
              {/* <select id="unidades" className='w-full p-2 mb-4 border rounded'>
                <option value="kg">Kilogramos</option>
                <option value="lb">Libras</option>
              </select> */}
              <label className="block text-sm mb-2" htmlFor="formatofecha">Formato de fecha:</label>
              <select id="formatofecha" className='w-full mb-4 border rounded' value={formatoFecha} onChange={handleFormatoFechaChange}d>
                <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                <option value="yyyy-mm-dd">yyyy-mm-dd</option>
              </select>
              <label className='block text-sm mb-2' htmlFor="formatohora">Formato de hora:</label>
              <select id="formatohora" className='w-full p-2 mb-4 border rounded' value={formatoHora} onChange={(e) => setFormatoHora(e.target.value)}>
                <option value="12hrs">12hrs</option>
                <option value="24hrs">24hrs</option>
              </select>
              <label className='block text-sm mb-2'>Cambiar Tema:</label>
              <div className="theme-toggle-container">
              <label className="theme-toggle-switch">
                  <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
                  <span className="slider"></span>
              </label>
              </div>
              <div className="modal-buttons">
              <button type="button" className="cancelar px-4 py-2 bg-red-400 rounded" onClick={closeModal}>Cancelar</button>
              <button type="button" className="guardar px-4 py-2 bg-blue-400 rounded" onClick={guardarCambiosGenerales}>Guardar</button>
              <button type="button" className="restablecer px-4 py-2 bg-gray-400 rounded" onClick={handleRestablecer}>Restablecer Valores</button>
            </div>
            </form>
          </div>
        )}

{activeModal === 'cuentaModal' && (
  <div id="cuentaModal" className="modal modal-desplazado mx-auto p-4 bg-white shadow-lg rounded-lg text-center">
    <h3 className='text-lg font-semibold mb-4'>Ajustes de Cuenta</h3>
    <div className="perfil flex flex-col items-center">
      <div className="mb-6">
        {imagePreview ? (
          <img src={imagePreview} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
        ) : (
          <div className="rounded-full w-24 h-24 bg-gray-300"></div>
        )}
      </div>
      <label htmlFor="file-input" className="bg-gray-400 px-4 py-2 text-white rounded-md cursor-pointer">Cambiar Imagen</label>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

    {/* mostrat correo electronico */}
    {/* <div className="email mb-4">
      <p className="text-sm font-semibold">Correo Electrónico:</p>
      <p className="text-gray-600">{userEmail}</p> 
    </div> */}
    <p className="text-gray-600">email</p>

    <div className="modal-buttons">
      <button type="button" className="cancelar px-4 py-2 bg-red-400 rounded" onClick={closeModal}>Cancelar</button>
      <button type="button" className="guardar px-4 py-2 bg-blue-400 rounded" onClick={guardarImagenCuenta}>Guardar</button>
      {/* <button type="button" className="restablecer px-4 py-2 bg-gray-400 rounded" onClick={handleRestablecer}>Restablecer Valores</button> */}
    </div>
  </div>  
)}

{activeModal === 'accesibilidadModal' && (
        <div
          id="accesibilidadModal"
          className={`modal ${modalWidth} bg-white p-6 rounded shadow-lg`}
        >
          <h3 className="text-lg font-semibold mb-4">Accesibilidad</h3>
          <form>
            <label htmlFor="fontSize" className="block text-sm">Tamaño de fuente:</label>
            <input
              type="range"
              id="fontSize"
              min="12"
              max="24"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <button onClick={decreaseFontSize} className="bg-gray-300 px-4 py-2 rounded">-</button>
              <button onClick={increaseFontSize} className="bg-gray-300 px-4 py-2 rounded">+</button>
            </div>
            <button
              type="button"
              onClick={guardarCambiosGenerales}
              className="bg-blue-400 px-4 py-2 mt-4 rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleRestablecer}
              className="bg-gray-400 px-4 py-2 mt-2 rounded"
            >
              Restablecer
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 px-4 py-2 mt-2 rounded"
            >
              Cerrar
            </button>
          </form>
        </div>
      )}





        {activeModal === 'acercaModal' && (
          <div id="acercaModal" className="modal modal-desplazado fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* <h3 className='text-lg font-semibold mb-4'>Ajustes de Privacidad</h3> */}
            <div className="modal-content mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
            <h1 className='text-xl font-semibold mb-4'>SIGEMA</h1>
            <h3 className='text-xl font-semibold mb-4'>Sistema integrado de Gestión Médica y Atención</h3>
            <p className="text-sm text-gray-700 mb-6">
              Bienvenido al sistema de gestión de citas médicas, diseñado específicamente para doctores. 
              Este sistema facilita la administración de pacientes, agendas y citas de manera eficiente.</p>
              <div className="informacion-adicional text-left text-sm text-gray-600 mb-6">
                <p className=''><strong>Vercion:</strong>1.0.0</p>
                <p className=''><strong>Desarrollado por:</strong></p>
                <p className=''><strong>Contacto:</strong>soporte@gmail.com</p>
                <p> <strong>Características:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Agenda digital para organizar citas médicas.</li>
                  <li>Gestión de perfiles de pacientes con historial médico.</li>
                  <li>Opciones para reprogramar o cancelar citas.</li>
                  <li>Reportes y estadísticas sobre la gestión médica.</li>
                </ul>

                </div> 
            <div className="modal-buttons flex justify-center gap-4 ">
              <button type="button" className="cerrar px-4 py-2 bg-blue-400 text-white rounded" onClick={closeModal}>Salir</button>
              {/* <button type="button" className="guardar px-4 py-2 bg-blue-400 rounded" onClick={handleGuardar}>Guardar</button>
              <button type="button" className="restablecer px-4 py-2 bg-gray-400 rounded" onClick={handleRestablecer}>Restablecer Valores</button> */}
            </div>
          </div>
          </div>
        )}
      </div>
    );
  };


  
  export default Settings;
