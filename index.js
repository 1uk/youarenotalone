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
	socket.on('disconnect', () => {
		let id = socket.client.conn.id;
		globalClients = globalClients.map(client => {
			if (client.clientId == id) {
				client.x = 0;
				client.y = 0;
			};
			return client;
		});
		console.log('user disconnected')
	});
	socket.on('coord message', (x, y) => {
		let id = socket.client.conn.id;
		globalClients = globalClients.map(client => {
			if (client.clientId == id) {
				client.x = x;
				client.y = y;
			}
			return client;
		});
		io.emit('coord message', globalClients.map(client => {
			console.log('coord message emit', client);
			return [client.x, client.y]
		}));
	});
});

http.listen(3000, () => {
	console.log('listeing on *:3000');
});
