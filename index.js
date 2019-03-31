const { server } = require('./src/appConfig');
const port = process.env.PORT || 5000;
server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Listening ${port}`);
});

module.exports = { server };