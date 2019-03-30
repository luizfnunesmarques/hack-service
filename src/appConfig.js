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

app.use('/get-some-feature-data', SomeFeatureRoute.router);

module.exports = { app };
