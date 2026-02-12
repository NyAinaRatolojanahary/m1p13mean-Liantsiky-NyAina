const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connecté');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Erreur MongoDB:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB déconnecté');
  });
};

module.exports = connectDB;
