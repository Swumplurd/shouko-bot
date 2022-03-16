const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.DB_CNN);
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar a la base de datos');
    }
}

module.exports = dbConnection;