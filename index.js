var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
	console.log(socket);
	io.emit('connect message', 'someone connected');
	socket.on('disconnect', () => {
	  console.log('user disconnected')
	  io.emit('connect message', 'someone disconnected');
	});
	socket.on('chat message', (msg) => {
	  io.emit('chat message', msg);
	  console.log('message: ' + msg);
	});
});

http.listen(3000, () => {
	console.log('listeing on *:3000');
});
