var win = Ti.UI.createWindow({
    backgroundColor: '#333'
});
 
var box = Ti.UI.createView({
  backgroundColor:'blue',
	center:{x:50,y:50},
	height:40,
	width:40
});

win.add(box);
 
win.open();
 
box.addEventListener('touchmove', function(evt) {
    var point = box.convertPointToView({ x: evt.x, y: evt.y }, win);	
   	
   	box.center = point;	
});
 
box.addEventListener('touchend', function(evt){
	var point = box.convertPointToView({ x: evt.x, y: evt.y }, win);	

	alert("x:"+point.x+" y:"+point.y);
});