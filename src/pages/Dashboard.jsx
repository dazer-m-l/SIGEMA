
  import React, { useState, useEffect } from 'react';

  import settings from '../pages/Settings';
  const Dashboard = () => {
    const [horaActual, setHoraActual] = useState("");
    const [fechaActual, setFechaActual] = useState("");
    const formatoFecha = "dd-mm-yyyy";
    // const [formatohora, setFormatoHora] = useState("24hrs");

    useEffect(() => {
      const actualizarFechaYHora = () => {
        setHoraActual(obtenerHoraFormateada());
        setFechaActual(obtenerFechaFormateada());
      };
  
      actualizarFechaYHora(); // Actualizar inmediatamente al cargar
      const interval = setInterval(actualizarFechaYHora, 1000); // Actualizar cada segundo
  
      return () => clearInterval(interval);
    }, []);

  
  const formatoHora = (date) => {
  
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  


 
  const obtenerFechaFormateada = () => {
    const opcionesFecha = formatoFecha === "dd-mm-yyyy"
      ? { day: '2-digit', month: '2-digit', year: 'numeric' }
      : { month: '2-digit', day: '2-digit', year: 'numeric' };

    return new Date().toLocaleDateString('es-ES', opcionesFecha);
  };
const obtenerHoraFormateada = () => {
    const opcionesHora = formatoHora === "24hrs"
      ? { hour: '2-digit', minute: '2-digit', hour12: false }
      : { hour: '2-digit', minute: '2-digit', hour12: true };
    const fechaActual = new Date();
    return new Intl.DateTimeFormat('es-ES', opcionesHora).format(fechaActual);
  };
    return (
      <div>
        <h1 className="text-2xl font-bold">Status General</h1>
        <p>Esta sección mostrará estadísticas y gráficos del comportamiento del hospital.</p>
        <div className='text-sm mt-4'>
        <p className="text-lg">Fecha: {fechaActual}</p>
          <p className='text-lg'>Hora actual:{horaActual}</p>
        </div>
      </div>
    );
  };

  export default Dashboard;
