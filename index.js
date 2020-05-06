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


io.on('connection', (socket) => {
	console.log(socket.client.conn.id);
	io.emit('connect message', socket.client.conn.id);
	socket.on('disconnect', () => {
		console.log('user disconnected')
		io.emit('disconnect message', socket.client.conn.id);
	});
	socket.on('coord message', (x, y) => {
		io.emit('coord message', [socket.client.conn.id, x, y]);
	});
});

http.listen(3000, () => {
	console.log('listeing on *:3000');
});
