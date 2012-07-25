//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var HelloView = require('ui/common/HelloView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var firstView = new HelloView();
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
