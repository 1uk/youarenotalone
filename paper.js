'use strict';

var paper = require('paper');
var io = require('socket.io-client');
var socket = io();


// Only executed our code once the DOM is ready.
window.onload = function() {
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	paper.view.onMouseMove = function(event) {
		socket.emit('coord message', event.point.x, event.point.y);
	};

	var coordList = [];
	socket.on('coord message', function(msg) {
		console.log(msg);
		coordList = msg;
	});

	var paths = [];
	for (let i = 0; i < 32; i++) {
		let path = new paper.Path.Circle(new paper.Point(0, 0), 20)
		path.strokeColor = 'black';
		paths.push(path);

	}

	paper.view.onFrame  = function(event) {
		coordList.forEach((coords, i) => paths[i].position = new paper.Point(coords));
	}
}
