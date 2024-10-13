const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./config/db');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

db.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.log('Error al conectar a la base de datos:', err));
