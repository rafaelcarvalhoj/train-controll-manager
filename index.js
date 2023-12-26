const express = require('express');
const bodyparser = require('body-parser');
const sequilize = require('./util/database');
const Exercice  = require('./models/exercice');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

//CRUD ROUTES
app.use('/exercices', require('./routes/exercices'));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//sync database
sequilize
  .sync()
  .then(result => {
  console.log("Database connected");
  app.listen(3000);
})
.catch(err => console.log(err));