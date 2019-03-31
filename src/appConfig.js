const express = require('express');
require('dotenv').config();
const socketIO = require('socket.io');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { EventRoute } = require('./event');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let allowedDomains = process.env.DOMINIOS_PERMITIDOS
  ? process.env.DOMINIOS_PERMITIDOS.split(',')
  : [''];
allowedDomains = [...allowedDomains, 'Postman'].map(dominio => dominio.toString().trim());

const corsOptions = {
  origin: function(origin, callback) {
    if (allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Domain ${origin} allowed`));
    }
  }
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('combined'));

app.get('/healthcheck/', async (req, res) => {
  res.json({
    mensage: 'Serviço gerenciador auth 0'
  });
});

const server = require('http').createServer(app);
const io = socketIO(server);
app.set('io', io);

app.use('/messages', EventRoute.router);

io.on('connection', client => {
  client.join('data_feed');
});

module.exports = { server };
