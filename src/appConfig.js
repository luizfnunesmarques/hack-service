const express = require('express');

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { SomeFeatureRoute } = require('./someFeature');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.sockets.on('connection', function(socket, username) {
  socket.join('data_feed');

  const event = { heatmap: [{ timestamp: Date.now(), position: { x: 1, y: 2 } }] };

  // When the client connects, they send a message
  socket.emit('message', msg => console.log('msg :', msg));

  // Get some of the data that has happened (maybe not all data ... just until last couple minutes)
  socket.on('#get_data', player => {
    console.log('get data on ', player);
    const test_data = Object.assign({ player }, event);
    socket.emit('get_data', test_data);
    return test_data;
  });
});

// const io = require('socket.io')(80);
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
  io.emit('connection');
  res.json({
    mensage: 'Serviço gerenciador auth 0'
  });
});
app.use('/get-some-feature-data', SomeFeatureRoute.router);

module.exports = { app, io };
