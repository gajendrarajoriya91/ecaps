const mongoose = require('mongoose');
const { MONGO_URL } = require('./envVariables')

mongoose.connect(MONGO_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Database connected!!');
});

module.exports = db;
