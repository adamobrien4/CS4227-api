require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongoDB');
});

const app = require('./app');

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
