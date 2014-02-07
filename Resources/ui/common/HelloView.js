var CONFIG = require('config');
var self;

// HelloView Component Constructor
function HelloView() {
	
	// create object instance
	self = Ti.UI.createView({
		height : Ti.UI.FILL,
		width  : Ti.UI.FILL
	});
	
	// initialize OpenTok state
	self.opentok = require('com.tokbox.ti.opentok');
	self.session = self.opentok.createSession({ sessionId : CONFIG.sessionId });
	self.session.addEventListener("sessionConnected", sessionConnectedHandler);
	self.session.addEventListener("sessionDisconnected", sessionDisconnectedHandler);
	self.session.addEventListener("sessionFailed", sessionFailedHandler);
	self.session.addEventListener("streamCreated", streamCreatedHandler);
	
	// create labels
	self.publisherLabel = Ti.UI.createLabel({
		top  : 20,
		height: 21,
		width: Ti.UI.FILL,
		text : 'Publisher',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	self.subscriberLabel = Ti.UI.createLabel({
		top  : 201,
		height: 21,
		width: Ti.UI.FILL,
		text : 'Subscriber',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	// create connecting modal
	self.connectingSpinner = Ti.UI.createActivityIndicator({
		color: 'white',
		message: '',
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height: 200,
		width: 200,
		center: {
			x: '50%',
			y: '50%'
		},
		backgroundColor : 'black',
		borderRadius: 10
	});
	
	// create connect/disconnect button
	self.connectButton = Ti.UI.createButton({
		bottom: 20,
		title: 'Connect'
	});
	self.connectButton.addEventListener('click', toggleConnect);
	self.add(self.connectButton);
	
	return self;
}

function sessionConnectedHandler(event) {
	self.connectButton.title = 'Disconnect';
	dismissSpinner();
	
	// Start publishing from my camera
	self.publisher = self.session.publish();
	self.publisherView = self.publisher.createView({
		width  : 160,
		height : 120,
		top    : 61
	});
	self.add(self.publisherLabel);
	self.add(self.publisherView);
}

function sessionDisconnectedHandler(event) {
	self.connectButton.title = 'Connect';
	dismissSpinner();
	
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
			width  : 160,
			height : 120,
			top    : 242
		});
		self.add(self.subscriberLabel);
		self.add(self.subscriberView);
	}
}

function sessionFailedHandler (event) {
	dismissSpinner();
	alert(event.error.message);
}

function toggleConnect(event) {
	var spinnerMessage;
	if (self.session.sessionConnectionStatus === 'disconnected' ||
		self.session.sessionConnectionStatus === 'failed' ) {
		self.session.connect(CONFIG.apiKey, CONFIG.token);
		spinnerMessage = 'Connecting...';
	} else {
		Ti.API.info('before disconnect');
		self.session.disconnect();
		Ti.API.info('after disconnect');
		spinnerMessage = 'Disconnecting...';
	}
	showSpinner(spinnerMessage);
}

function showSpinner(message) {
	Ti.API.info('before show spinner');
	self.connectingSpinner.message = message;
	self.add(self.connectingSpinner);
	self.connectingSpinner.show();
	self.connectButton.enabled = false;
	Ti.API.info('after show spinner');
}

function dismissSpinner() {
	// Dismiss spinner
	self.connectingSpinner.hide();
	self.remove(self.connectingSpinner);
	self.connectButton.enabled = true;
}

module.exports = HelloView;
