var circle = new Path.Circle(new Point(80, 50), 30);
circle.fillColor = 'black';

view.onMouseMove = function(event) {
	circle.position = event.point;
	console.log(event.point);
}
