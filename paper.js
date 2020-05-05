var paper = require('paper');
var io = require('socket.io-client');
var socket = io();

// Only executed our code once the DOM is ready.
	window.onload = function() {
		// Get a reference to the canvas object
		var canvas = document.getElementById('myCanvas');
		// Create an empty project and a view for the canvas:
		paper.setup(canvas);
		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path.Circle(new paper.Point(100, 100), 20);
		// Give the stroke a color
		path.strokeColor = 'black';
		paper.view.onMouseMove = function(event) {
			//console.log(event.point);
			socket.emit('coord message', event.point);
			//path.position = event.point;
		};
		socket.on('coord message', function(msg) {
			console.log(msg);
			console.log(msg[1], msg[2]);
			path.position = new paper.Point(msg[1], msg[2]);
		});
		// Draw the view now:
		paper.view.draw();
	}
