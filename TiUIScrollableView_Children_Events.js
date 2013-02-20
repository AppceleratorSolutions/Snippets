/*
 * Issue:
 * 
 * A TiUIScrollableView consisting of multiple children views associated with it,  
 * may get multiple events fired i.e. click & swipe when attempt to scroll either left or right. 
 *  
 * On children views, we generally take care of a few things:
 * - We would like to be able to click a child-view and still be able to scroll between the views.
 * - Require to disable captures all touches (even swipe ones) as clicks
 *  
 * 
 * Tested:
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

//Building a test interface ...
var win1 = Titanium.UI.createWindow({
	backgroundColor : '#fff'
});

win1.add(Titanium.UI.createLabel({
	color : '#999',
	text : 'I am Window 1',
	font : {
		fontSize : 20,
		fontFamily : 'Helvetica Neue'
	},
	textAlign : 'center',
	width : 'auto'
}));

var viewsArray = [];
var i;
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



/*
var win = Ti.UI.createWindow({
    backgroundColor:'white'
});

win.open();

// CASE 1

var data = [
    {title:'Row 1', hasChild:true, color:'red', selectedColor:'#fff'},
    {title:'Row 2', hasDetail:true, color:'green', selectedColor:'#fff'},
];

// create table view
var tableview = Titanium.UI.createTableView({
    top: 20,
    height: 200,
    data:data,
    borderColor: 'orange',
    borderWidth:'5',
    separatorColor:'black',
    headerTitle:'Table 1 without using createTableViewRow'
});

win.add(tableview);

// create table view event listener
tableview.addEventListener('click', function(e)
{
    showClickEventInfo(e);
});

function showClickEventInfo(e) {
    var row = e.row;
    var rowdata = e.rowData;
    alert('Row Title '+row.title);
    alert('Row Data Title '+rowdata.title);
}


// CASE 2

var data1 = [];

data1[0] = Ti.UI.createTableViewRow({hasChild:true,title:'Row 1'});
data1[1] = Ti.UI.createTableViewRow({hasDetail:true,title:'Row 2'});


// create table view
var tableview1 = Titanium.UI.createTableView({
    top: 240,
    borderColor: 'orange',
    borderWidth:'5',
    height: 200,
    separatorColor:'black',
    data:data1,
    headerTitle:'Table 2 without using createTableViewRow'
});

win.add(tableview1);

function showClickEventInfo1(e) {
    var row = e.row;
    var rowdata = e.rowData; 
    alert('Row Title '+row.title); 
    alert('Row Data Title '+rowdata.title);
}


// create table view event listener
tableview1.addEventListener('click', function(e)
{
    showClickEventInfo1(e);
});

 */

/*Simple Switch Example
//Create a standard switch, using default values, and output value property on each change event.

var win = Ti.UI.createWindow({
  backgroundColor: 'gray',
  layout: 'vertical'
});


//Toggle Button Switch Example (Android)
//Create a standard (toggle button) switch with a customized title for each on/off state, and output value property on each change event.

var basicSwitchToggleButton = Ti.UI.createSwitch({
	top: 5,
  style: Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,	
  titleOn:'Notifications Enabled',
  titleOff:'Notifications Disabled',
  value:true,
  width: 200, height:120
});
win.add(basicSwitchToggleButton);

basicSwitchToggleButton.addEventListener('change',function(e){
  Ti.API.info('Switch value: ' + basicSwitchToggleButton.value);
});

//Checkbox Switch Example (Android)
//Create a checkbox switch, and output value property on each change event.

var basicSwitchStyleCheckbox = Ti.UI.createSwitch({
  top: 30,
  style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
  textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
  title:'Notifications',
  titleOn:'Notifications Enabled',
  titleOff:'Notifications Disabled',
  value:true,
  width: 300 // necessary for textAlign to be effective
});
win.add(basicSwitchStyleCheckbox);

basicSwitchStyleCheckbox.addEventListener('change',function(e){
  Ti.API.info('Switch value: ' + basicSwitchStyleCheckbox.value);
});

var textField = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
  color: '#336699',
  top: 30, left: 10,
  width: 250, height: 60,
  hintText: 'textField'
});

win.add(textField);

var picker = Ti.UI.createPicker({
  top:45,
  type: Ti.UI.PICKER_TYPE_DATE,
  minDate:new Date(2009,0,1),
  maxDate:new Date(2014,11,31),
  value:new Date(2014,3,12),  
});

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Bananas'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries'});
data[2]=Ti.UI.createPickerRow({title:'Mangos'});
data[3]=Ti.UI.createPickerRow({title:'Grapes'});

//picker.add(data);
//picker.selectionIndicator = true;

win.add(picker);

win.open();


//style="?android:attr/spinnerDropDownItemStyle"
//http://developer.android.com/reference/android/R.attr.html#dropDownSelector

*/




/*
//Pedro's Table Module
var TiTable = require('ti.table');

var data = [];
var i = 0;
for (i = 0; i <= 1000; i ++){
	data[i] = {title: 'hello '+ i, subtitle : 'world '+ i};
}

var tableView = TiTable.createTableView({
    backgroundColor: 'white',
    type: TiTable.SUBTITLE,
    data: data
});

var win = Ti.UI.createWindow();

win.add(tableView);

win.open();

*/


/*
var slider = Titanium.UI.createSlider({
	//top : 200,
	min : 0,
	max : 100,
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	value : 50
});

var label = Ti.UI.createLabel({
	top : 150,
	text : slider.value,
	width : '100%',
	height : 'auto',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
});

slider.addEventListener('change', function(e) {
	label.text = 'Value: ' + e.value ;
});

var win = Ti.UI.createWindow({
	backgroundColor : 'gray'
});

win.add(label);

var sliderView = Ti.UI.createView({
	height: 100,
	width:  500,
	backgroundColor: 'red'
});

sliderView.add(slider);

sliderView.transform = Ti.UI.create2DMatrix().rotate(-90);

win.add(sliderView);

win.open(); 

*/


