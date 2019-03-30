// require('dotenv').config();
// const http = require('http');
// const fs = require('fs');

// // Loading the file index.html displayed to the client
// const server = http.createServer((req, res) => {
//   fs.readFile('./index.html', 'utf-8', (error, content) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(content);
//   });
// });

// Loading socket.io
// const io = require('socket.io').listen(server);

// io.sockets.on('connection', (socket, username) => {
//   socket.join('data_feed');

//   const event = { heatmap: [{ timestamp: Date.now(), position: { x: 1, y: 2 } }] };

//   // When the client connects, they send a message
//   socket.emit('message', 'You are connected!');

//   // Get some of the data that has happened (maybe not all data ... just until last couple minutes)
//   socket.on('#get_data', player => {
//     console.log('get data on ', player);
//     const test_data = Object.assign({ player }, event);
//     socket.emit('get_data', test_data);
//     return test_data;
//   });
// });

// setInterval(() => {
//   const event = {
//     heatmap: [{ timestamp: Date.now(), position: { x: Math.random(), y: Math.random() } }]
//   };
//   io.to('data_feed').emit('update_data', event);
// }, process.env.FEEDBACK_TIMER);

// module.exports = { io };
