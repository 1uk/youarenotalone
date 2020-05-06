'use strict';

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


var globalClients = [];

io.on('connection', (socket) => {
	let id = socket.client.conn.id;
	globalClients.push({clientId: id, x: 0, y: 0});
	io.emit('connect message', socket.client.conn.id);
	socket.on('disconnect', () => {
		console.log('user disconnected')
		io.emit('disconnect message', socket.client.conn.id);
	});
	socket.on('coord message', (x, y) => {
		let id = socket.client.conn.id;
		globalClients = globalClients.map(client => {
			if (client.clientId == id) {
				client.x = x;
				client.y = y;
			}
		});
		io.emit('coord message', [globalClients, clientCoords(globalClients)]);
	});
});

function clientCoords(clients) {
	return clients.map(client => client = [x: client.x, y: client.y]);
}

http.listen(3000, () => {
	console.log('listeing on *:3000');
});
