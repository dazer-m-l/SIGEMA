# SIGEMA (Sistema de Gestión Médica)

## Descripción

SIGEMA (Sistema de Gestión Médica) es una aplicación web diseñada para facilitar la gestión de citas médicas, permitiendo agendar citas en un centro de atención medica, ver su historial médico y a los médicos gestionar sus horarios y consultar la información de sus pacientes. El objetivo de SIGEMA es optimizar la atención médica y mejorar la comunicación entre médicos y pacientes.

## Tecnologías Utilizadas

- **Frontend:** React JSX, Tailwind CSS
- **Backend:** Node.js
- **Base de datos:** MySQL
- **Librerías:** express, cors, mysql2, sequelize, nodemon, dotenv, body-parser, axios, react-router-dom, tailwindcss

## Funcionalidades Clave

- **Registro y Autenticación:**
  - Administrativos pueden registrarse, y agendar citas.
  - Médicos pueden iniciar sesión y ver las citas programadas.

- **Gestión de Citas:**
  - Los administrativos pueden desarrollar cambios CRUD en citas con médicos específicos.
  - Los médicos pueden aprobar o modificar la fecha y hora de las citas.

- **Historial Médico:**
  - Administrativos pueden ver un historial de todas sus citas pasadas y futuras.
  - Médicos pueden acceder al historial de citas de los pacientes y dejar notas.

- **Perfil del Personal y Pacientes:**
  - Los médicos pueden actualizar su perfil con información relevante.
  - Los Administrativos pueden desarrollar cambios CRUD en medicos y pacientes es cada perfil con información relevante.

- **Panel Administrativo:**
  - Los administradores supervisar el sistema.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
