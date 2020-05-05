var paper = require('paper');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.get('/bundle.js', (req, res) => {
	res.sendFile(__dirname + '/bundle.js');
});

var clients = [];

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected')
	});
	socket.on('coord message', (msg) => {
	  io.emit('coord message', msg);
	});
});

http.listen(3000, () => {
	console.log('listeing on *:3000');
});
