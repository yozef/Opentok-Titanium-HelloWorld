var self;

function LoadingView(_args) {
	self = Ti.UI.createView(_args);
	
	self.opacity = 0.8;
	self.borderRadius = 10;
	self.backgroundColor = 'black';
	self.layout = 'vertical';
	
	self.width = self.width || 200;
	self.height = self.height || 200;
	
	// Activity indicator
	var spinner = Ti.UI.createActivityIndicator({});
	
	// Loading label
	var loadingLabel = Ti.UI.createLabel({
		text : _args.loadingText || 'Loading...'
		
	});
	
	return self;
}

module.exports = LoadingView
