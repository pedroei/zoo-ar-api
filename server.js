require('dotenv/config');
const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || '3000';

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set EJS as templating engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.send('AR models API'));
app.use('/armodels', require('./routes/armodels'));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('Server listening on port', PORT);
});
