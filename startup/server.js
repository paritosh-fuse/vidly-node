const mongoose = require('mongoose');
const config = require('config');

const MONGODB_URI = config.get('MONGODB_URI')
mongoose.Promise = Promise;

const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

mongoose.connect(MONGODB_URI, opts);
const { connection } = mongoose;

connection.on('error', (e) => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e.message);
    mongoose.connect(MONGODB_URI, opts);
  }
  console.log(e.message);
  process.exit(1)
});
connection.on('connected', () => {
  console.log(`MongoDB successfully connected to ${MONGODB_URI}`);
});
connection.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

process.on('SIGINT', async () => {
  await connection.close();
  console.log('Force to close the MongoDB conection');
  process.exit(0);
});

module.exports = connection