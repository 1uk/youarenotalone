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
		let client = clients.find(client => {
			console.log("finding the client with id: " + msg[0], client);
			return client.clientId == msg[0];
		});
		console.log("found the client!", client);
		client.clientPath.position = new paper.Point(msg[1], msg[2]);
	});
	socket.on('user message', function(id) {
		var path = new paper.Path.Circle(new paper.Point(0, 0), 20);
		path.strokeColor = 'black';
		clients.push({clientId: id, clientPath: path});
	});
	// Draw the view now:
	paper.view.draw();
}
