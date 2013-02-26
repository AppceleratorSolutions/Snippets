//This is a demo to show how backgroundLeftCap and backgroundTopCap work on the Tianium platform by Appcelerator
//Paste this code in app.js (tested on iOS)
//Screenshot: http://screencast.com/t/txWQD3l2UBN

///////////////////////////////////////////////////////////////////////////////
//Just modify these variables to see how backgroundLeftCap and topCap will work

var topCap = 20;
var leftCap = 35;
var originalImageSize = {height:100, width:100}
var stretchedImageSize = {height:200,width:200}
var demoImage = boxImage(originalImageSize);//replace with your image

////////////////////////////////////////////////////////////////////////////////
//Demo Specific Code...

//stretched view
var view = Ti.UI.createView({
    top: 10,
    height: stretchedImageSize.height,
    width: stretchedImageSize.width,
    backgroundLeftCap: leftCap,
    backgroundTopCap: topCap,
    backgroundImage: demoImage
});

//original image
var image = Ti.UI.createView({
    bottom: 40,
    height: originalImageSize.height,
    width: originalImageSize.width,
    backgroundImage: demoImage
});

//cap areas with opactiy
var topLeftCap = Ti.UI.createView({
    top: 0,
    left: 0,
    width: view.backgroundLeftCap,
    height: view.backgroundTopCap,
    opacity: 0.7,
    backgroundColor: 'red'
});

var topRightCap = Ti.UI.createView({
    top: 0,
    right: 0,
    width: view.backgroundLeftCap,
    height: view.backgroundTopCap,
    opacity: 0.7,
    backgroundColor: 'red'
});

var bottomRightCap = Ti.UI.createView({
    bottom: 0,
    right: 0,
    width: view.backgroundLeftCap,
    height: view.backgroundTopCap,
    opacity: 0.7,
    backgroundColor: 'red'
});

var bottomLeftCap = Ti.UI.createView({
    bottom: 0,
    left: 0,
    width: view.backgroundLeftCap,
    height: view.backgroundTopCap,
    opacity: 0.7,
    backgroundColor: 'red'
});

var label1 = Ti.UI.createLabel({
  text:"Original image with overlay to show top & left cap areas",
	bottom:10,
	width:'fill',
	minimumFontSize:6
});

var label2 = Ti.UI.createLabel({
	text:"Stretched image with topCap as "+view.backgroundTopCap+" and leftCap as "+view.backgroundLeftCap,
	top:15+view.height,
	width:'fill',
	minimumFontSize:6
});
var win = Ti.UI.createWindow({
	backgroundColor: 'white'
});

image.add(bottomLeftCap,bottomRightCap,topLeftCap,topRightCap);

win.add(image, view, label1, label2);

//function to create demo image
function boxImage(imageSize){
	var box = Ti.UI.createView({
		backgroundColor:"green",
		width:imageSize.width,
		height:imageSize.height
	});
	
	var tlLabel = Ti.UI.createLabel({
		color:"black",
		textAlign:'left',
		height:'size',
		width:'size',
		font:{fontSize:10},
		text:"top Left",
		top:0,
		left:0
	})
	
	var trLabel = Ti.UI.createLabel({
		color:"black",
		textAlign:'right',
		height:'size',
		width:'size',
		font:{fontSize:10},
		text:"top Right",
		top:0,
		right:0
	})
	
	var blLabel = Ti.UI.createLabel({
		color:"black",
		textAlign:'left',
		height:'size',
		width:'size',
		font:{fontSize:10},
		text:"bottom \nLeft",
		bottom:0,
		left:0
	})
	
	var brLabel = Ti.UI.createLabel({
		color:"black",
		textAlign:'right',
		height:'size',
		width:'size',
		font:{fontSize:10},
		text:"bottom \nRight",
		bottom:0,
		right:0,
	
	});
	
	var centerLineVert = Ti.UI.createView({
		height:'fill',
		width:3,
		backgroundColor:'black'
	});
	
	var centerLineHorz = Ti.UI.createView({
		height:3,
		width:'fill',
		backgroundColor:'black'
	});
	
	box.add(tlLabel,trLabel,blLabel, brLabel, centerLineVert, centerLineHorz);

	return box.toImage();
}

if(view.height<=image.height || view.width<=image.width){
	alert("You are not stretching the image so top & left Cap properties will not apply.")
}

win.open();