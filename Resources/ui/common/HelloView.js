var CONFIG = require('config');
var self;

// HelloView Component Constructor
function HelloView() {
	// create object instance
	self = Ti.UI.createView({
		height : 'auto',
		width  : 'auto'
	});
	
	// initialize OpenTok state
	self.opentok = require('com.tokbox.ti.opentok');
	self.session = self.opentok.createSession({ sessionId : CONFIG.sessionId });
	self.session.addEventListener("sessionConnected", sessionConnectedHandler);
	self.session.addEventListener("sessionDisconnected", sessionDisconnectedHandler);
	self.session.addEventListener("sessionFailed", sessionFailedHandler);
	self.session.addEventListener("streamCreated", streamCreatedHandler);
	self.session.connect(CONFIG.apiKey, CONFIG.token);
	
	// publishing only works from device: let's find out where we are
	self.onDevice = (Ti.Platform.architecture === 'arm');
	
	// create labels
	self.publisherLabel = Ti.UI.createLabel({
		top  : 20,
		text : 'Publisher'
	});
	self.subscriberLabel = Ti.UI.createLabel({
		top  : 20,
		text : 'Subscriber'
	});
	
	// create copying view
	if (!self.onDevice) {
		var CopyingView = require('ui/simulator/CopyingView');
		self.copyingView = new CopyingView({
			width          : 300,
			height         : 50,
			top            : 20,
			initialMessage : 'Publish from your Browser',
			lastMessage    : 'Open a Browser, Paste (⌘+V) the URL',
			copyText       : CONFIG.webUrl
		});
	}
	
	showSpinner();
	
	return self;
}

function sessionConnectedHandler(event) {
	dismissSpinner();
	
	// Start publishing from my camera
	if (self.onDevice) {
		Titanium.Media.requestAuthorization(function(response) {
			if (response.success) {
				self.publisher = self.session.publish();
				self.publisherView = self.publisher.createView({
					width  : 200,
					height : 150,
					top    : 20
				});
				self.add(self.publisherLabel);
				self.add(self.publisherView);
			}
		});
	} else {
		self.publisherLabel.text = 'Cannot Publish from Simulator';
		self.publisherLabel.color = 'red';
		self.add(self.publisherLabel);
		self.add(self.copyingView);
	}
}

function sessionDisconnectedHandler(event) {
	// Remove publisher, subscriber, and their labels
	self.remove(self.publisherLabel);
	self.remove(self.publisherView);
	self.remove(self.subscriberLabel);
	self.remove(self.subscriberView);
}

function streamCreatedHandler(event) {
	// Subscribe to first stream if I am not on a device;
	// Subscribe to only my own stream if I am.
	if ( (!self.onDevice && !self.subscriber ) || 
		 (event.stream.connection.connectionId === self.session.connection.connectionId)) {
		
		self.subscriber = self.session.subscribe(event.stream);
		self.subscriberView = self.subscriber.createView({
			width  : 200,
			height : 150,
			top    : 20
		});
		self.add(self.subscriberLabel);
		self.add(self.subscriberView);
	}
}

function sessionFailedHandler (event) {
	dismissSpinner();
	alert(event.error.message);
}

function showSpinner() {
	// show connecting modal
	self.connectingSpinner = Ti.UI.createActivityIndicator({
		color: 'white',
		message: 'Connecting...',
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height: 200,
		width: 200,
		backgroundColor : 'black',
		borderRadius: 10
	});
	self.add(self.connectingSpinner);
	self.connectingSpinner.show();
}

function dismissSpinner() {
	// Dismiss spinner
	self.connectingSpinner.hide();
	self.remove(self.connectingSpinner);
	self.layout = 'vertical';
}

module.exports = HelloView;
