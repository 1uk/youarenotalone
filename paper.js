'use strict';

var paper = require('paper');
var io = require('socket.io-client');
var socket = io();

var clients = [];

// Only executed our code once the DOM is ready.
window.onload = function() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('myCanvas');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	paper.view.onMouseMove = function(event) {
		socket.emit('coord message', event.point.x, event.point.y);
	};
	socket.on('coord message', function(msg) {
		console.log(msg);
		for client in clients {
			client.clientPath.remove();
		}
		for coords in msg[1] {
			var path = new paper.Path.Circle(new paper.Point(coords[0], coords[1]), 20);
			path.strokeColor = 'black';
		}

	});
	socket.on('connect message', function(id) {
		var path = new paper.Path.Circle(new paper.Point(0, 0), 20);
		path.strokeColor = 'black';
		clients.push({clientId: id, clientPath: path});
	});
	socket.on('disconnect message', function(id) {
		client = clients.find(client => client.clientId == id);
		client.clientPath.remove();
		clients = clients.filter(client => client.clientId != id);
		console.log('user disconnected, deleting client:', clients);
	});
	// Draw the view now:
	paper.view.draw();
}
