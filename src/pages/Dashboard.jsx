
  import React, { useState, useEffect } from 'react';
  import "../styles/settings.css";

  import settings from '../pages/Settings';
  const Dashboard = () => {
    const [horaActual, setHoraActual] = useState("");
  const [fechaActual, setFechaActual] = useState(null);
  const [formatoHora, setFormatoHora] = useState(() => localStorage.getItem("formatoHora") || "24hrs");
  const [formatoFecha, setFormatoFecha] = useState(() => localStorage.getItem("formatoFecha") || "dd-mm-yyyy");

  // Función para formatear la fecha según el formato seleccionado
  const formatoFechaSeleccionado = (fecha) => {
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    let fechaFormateada;
    switch (formatoFecha) {
      case "dd-mm-yyyy":
        fechaFormateada = fecha.toLocaleDateString("es-ES", opciones).replace(/\//g, "-");
        break;
      case "mm-dd-yyyy":
        fechaFormateada = fecha.toLocaleDateString("en-US", opciones).replace(/\//g, "-");
        break;
      case "yyyy-mm-dd":
        fechaFormateada = fecha.toISOString().split("T")[0];
        break;
      default:
        fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
        break;
    }
    return fechaFormateada;
  };

  // Función para formatear la hora
  const formatearHora = (fecha, formato) => {
    const opciones24 = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    const opciones12 = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
    return fecha.toLocaleTimeString("es-ES", formato === "24hrs" ? opciones24 : opciones12);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const fecha = new Date();
      setFechaActual(fecha);
      setHoraActual(formatearHora(fecha, formatoHora));
    }, 1000);

    return () => clearInterval(interval);
  }, [formatoHora]);

    // const [horaActual, setHoraActual] = useState("");
    // const [fechaActual, setFechaActual] = useState("");
    // const [formatoFecha, setFormatoFecha] = useState(() =>
    //   localStorage.getItem("formatoFecha") || "dd-mm-yyyy"
    // );
    // const [formatoFecha, setFormatoFecha] = useState(() => localStorage.getItem("formatoFecha") || "dd-mm-yyyy");
    // const [formatoHora, setFormatoHora] = useState(() =>
    //   localStorage.getItem("formatoHora") || "24hrs"
    // );
    // const [fechaActual, setFechaActual] = useState(null);
    // const formatoFecha = (fecha) => {
    //   const opciones = {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //     timeZone: "America/Mexico_City", // Cambia según tu zona horaria
    //   };
    //   return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
    // };
    
    // const formatoFechaSeleccionado = (fecha) => {
    //   const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    //   let fechaFormateada;
    //   switch (formatoFecha) {
    //     case "dd-mm-yyyy":
    //       fechaFormateada = fecha.toLocaleDateString("es-ES", opciones).replace(/\//g, "-");
    //       break;
    //     case "mm-dd-yyyy":
    //       fechaFormateada = fecha.toLocaleDateString("en-US", opciones).replace(/\//g, "-");
    //       break;
    //     case "yyyy-mm-dd":
    //       fechaFormateada = fecha.toISOString().split("T")[0];
    //       break;
    //     default:
    //       fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    //       break;
    //   }
    //   return fechaFormateada;
    // };
    
    // const [formatoFecha, setFormatoFecha] = useState(() =>
    //   localStorage.getItem("formatoFecha") || "dd-mm-yyyy"
    // );
    // const fechaFormateada = formatoFecha('2024-12-05', formatoFecha);
    ///////////////////////////////////////
    // const [fechaHoraActual, setFechaHoraActual] = useState(new Date());


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFechaActual(new Date());
  //   }, 1000); 
  //   return () => clearInterval(interval);
  // }, []);

  // const formatoFecha = (fecha, formato) => {
  //   const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
  //   switch (formato) {
  //     case "dd-mm-yyyy":
  //       return fecha.toLocaleDateString("es-ES", opciones).replace(/\//g, "-");
  //     case "mm-dd-yyyy":
  //       return fecha.toLocaleDateString("en-US", opciones).replace(/\//g, "-");
  //     case "yyyy-mm-dd":
  //       return fecha.toISOString().split("T")[0];
  //     default:
  //       return fecha.toLocaleDateString("es-ES", opciones);
  //   }
  // };

    
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const fecha = new Date();
  //     setFechaActual(fecha);
  //     setHoraActual(formatearHora(fecha, formatoHora));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [formatoHora]);
    // useEffect(() => {
    //   const actualizarFechaYHora = () => {
    //     setHoraActual(obtenerHoraFormateada());
    //     setFechaActual(obtenerFechaFormateada());
    //   };
  
    //   actualizarFechaYHora(); 
    //   const interval = setInterval(actualizarFechaYHora, 1000); 
  
    //   return () => clearInterval(interval);
    // }, [formatoFecha, formatoHora]);
  
    // const formatearHora = (fecha, formato) => {
    //   const opciones24 = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    //   const opciones12 = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
  
    //   return fecha.toLocaleTimeString("es-ES", formato === "24hrs" ? opciones24 : opciones12);
    // };  
  // const formatearFecha = (fecha, formato) => {
  //   const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
  //   const fechaObjeto = new Date(fecha);

  //   switch (formato) {
  //     case "dd-mm-yyyy":
  //       return fechaObjeto.toLocaleDateString("es-ES", opciones).replace(/\//g, "-");
  //     case "mm-dd-yyyy":
  //       return fechaObjeto.toLocaleDateString("en-US", opciones).replace(/\//g, "-");
  //     case "yyyy-mm-dd":
  //       return fechaObjeto.toISOString().split("T")[0];
  //     default:
  //       return fecha;
  //   }
  // };

  


 
//   const obtenerFechaFormateada = () => {
//     const opcionesFecha = formatoFecha === ""
//       ? { day: '2-digit', month: '2-digit', year: 'numeric' }
//       : { month: '2-digit', day: '2-digit', year: 'numeric' };

//     return new Date().toLocaleDateString('es-ES', opcionesFecha);
//   };
// const obtenerHoraFormateada = () => {
//     const opcionesHora = formatoHora === "24hrs"
//       ? { hour: '2-digit', minute: '2-digit', hour12: false }
//       : { hour: '2-digit', minute: '2-digit', hour12: true };
//     const fechaActual = new Date();
//     return new Intl.DateTimeFormat('es-ES', opcionesHora).format(fechaActual);
//   };
    return (
      <div className="status-general p-4">
  <h1 className="text-2xl font-bold text-black dark:text-white">Status General</h1>
  <p className="text-black dark:text-white">Esta sección mostrará estadísticas y gráficos del comportamiento del hospital.</p>
  <div className="text-sm mt-4">
    {/* <p class="text-lg text-black dark:text-white">Fecha: {formatoFecha(fechaActual, formatoFecha)}</p> */}
    <p className="text-lg text-black dark:text-white">Hora actual: {horaActual}</p>
    <p className="text-lg text-black dark:text-white">Fecha: {fechaActual ? formatoFechaSeleccionado(fechaActual) : ""}</p>
  </div>
  
</div>

    );
  };

  export default Dashboard;
