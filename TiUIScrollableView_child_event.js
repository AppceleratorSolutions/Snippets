/*
 * Issue:
 * 
 * A TiUIScrollableView consisting of multiple children views associated with it,  
 * may get multiple events fired i.e. click & swipe when attempt to scroll either left or right. 
 *  
 * On children views, we generally take care of a few things:
 *
 * 1. Require to disable captures all touches (even swipe ones) as clicks
 * 2. We would like to be able to click a child-view and still be able to scroll between the views. 
 *
 * How to mitigate:
 *
 * Instead of click event listener, touchStart & touchEnd events
 * overide swipe to capture gesture accurate.
 *
 * Tested:
 *
 * Titanium Mobile SDK 3.0.2 - iOS 6 simulator & Android 2.3.5
 *  
 */

//helper variables
var x;
var y;

//  ========== 
//  =Function: getView
//  =Params: iteration, bgColor 
//  ========== 

	function getView(i, color) {
		var view = Ti.UI.createView({
			backgroundColor : color
		});
		view.add(
		  Ti.UI.createLabel({
			text : 'View ' + i,
			color : '#fff',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		  })//TiUILabel
		);
		
		/*
		//Common approach causes events get wrongly handled.
		view.addEventListener('click', function(e) {
			Ti.API.info("view "+ i + " clicked!");
		});
		view.addEventListener('swipe', function(e) {
			Ti.API.info("view "+ i + " swipe!");
		});		
		 */
		
		//Instead, touchStart & touchEnd events overide swipe and
		//capture gesture accurately
		view.addEventListener('touchstart', function(e) {
			x = e.x;
			y = e.y;
		});
		view.addEventListener('touchend', function(e) {
			if (x == e.x && y == e.y) {
				Ti.API.info('view ' + i + ' Click event');
			}
		});
		view.addEventListener('swipe', function(e) {
			Ti.API.info('view ' + i + ' Swipe event');
		});
		return view;
	}

//Building a simple UI
var win1 = Titanium.UI.createWindow({
	backgroundColor : '#fff'
});

win1.add(
   Titanium.UI.createLabel({
	color : '#999',
	text : 'I am Window 1',
	font : {
		fontSize : 20,
		fontFamily : 'Helvetica Neue'
	},
	textAlign : 'center',
	width : 'auto'
   })
);

var viewsArray = [], i;
for ( i = 0; i <= 4; i++) {
	var bgColor = "purple";
	if (i & 1) {
		bgColor = "blue";
	}
	viewsArray[i] = getView(i, bgColor);
}

var scrollView = Titanium.UI.createScrollableView({
	views : viewsArray,
	showPagingControl : true,
	pagingControlHeight : 30,
	maxZoomScale : 2.0,
	currentPage : 1
});

win1.add(scrollView);

win1.open();
