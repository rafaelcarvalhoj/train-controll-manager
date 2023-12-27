require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const Exercice  = require('./models/exercice');
const cors = require('cors');

const app = express();

app.use(cors());

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
async function initialize() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(3000);
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    console.log('Todos os modelos foram sincronizados com sucesso.');
    const modelosNoBanco = Object.keys(sequelize.models);
    console.log('Modelos no banco de dados:', modelosNoBanco);
    console.log('Aplicação rodando na porta 3000');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

initialize();