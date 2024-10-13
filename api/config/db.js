const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sigema_db', 'root', '', {
    host: 'localhost', 
    dialect: 'mysql',  
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = sequelize;
