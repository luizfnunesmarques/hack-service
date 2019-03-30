require('dotenv').config();
const http = require('http');
const fs = require('fs');

// Loading the file index.html displayed to the client
const server = http.createServer( (request, response) => {
  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', (data) => {
      body += data
      console.log('Partial body: ' + body)
    })
    request.on('end', () => {
      const event = { ...body };
      io.to('data_feed').emit('update_data', event );
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end('post received')
    })
  } else {
    fs.readFile('./index.html', 'utf-8', (error, content) => {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(content);
    });
  }
});

// Loading socket.io
const io = require('socket.io').listen(server);

io.sockets.on('connection', ( socket, username ) => {
    socket.join('data_feed');

    const event = { heatmap:[ { timestamp: Date.now(), position: { x: 1, y: 2 } } ] };

    // When the client connects, they send a message
    socket.emit('message', 'You are connected!');

    // Get some of the data that has happened (maybe not all data ... just until last couple minutes)
    socket.on('#get_data', ( player ) => {
        console.log('get data on ', player);
        const test_data = Object.assign({ player }, event );
        socket.emit('get_data', test_data);
        return test_data;
    });
});

server.listen(8080);
