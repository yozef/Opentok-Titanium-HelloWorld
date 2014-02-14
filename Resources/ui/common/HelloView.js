var CONFIG = require('config');

var self, // the top level view
	session,
	publisher,
	publisherView,
	publisherLabel,
	subscriber,
	subscriberView,
	subscriberLabel,
	connectingSpinner;

// HelloView Component Constructor
function HelloView() {
	// create object instance
	self = Titanium.UI.createView({
		height : 'auto',
		width  : 'auto'
	});
	
	// initialize OpenTok state
	var opentok = require('com.tokbox.ti.opentok');
	session = opentok.createSession({ sessionId : CONFIG.sessionId });
	session.addEventListener("sessionConnected", sessionConnectedHandler);
	session.addEventListener("sessionDisconnected", sessionDisconnectedHandler);
	session.addEventListener("sessionFailed", sessionFailedHandler);
	session.addEventListener("streamCreated", streamCreatedHandler);
	session.connect(CONFIG.apiKey, CONFIG.token);
	
	// create labels
	publisherLabel = Titanium.UI.createLabel({
		top  : 20,
		text : 'Publisher'
	});
	subscriberLabel = Titanium.UI.createLabel({
		top  : 20,
		text : 'Subscriber'
	});
	
	showSpinner();
	
	return self;
}

function sessionConnectedHandler(event) {
	dismissSpinner();
	
	// Start publishing from my camera
	Titanium.Media.requestAuthorization(function(response) {
		if (response.success) {
			publisher = session.publish();
			publisherView = publisher.createView({
				width  : 200,
				height : 150,
				top    : 20
			});
			self.add(publisherLabel);
			self.add(publisherView);
		}
	});
}

function sessionDisconnectedHandler(event) {
	// Remove publisher, subscriber, and their labels
	self.remove(publisherLabel);
	self.remove(publisherView);
	self.remove(subscriberLabel);
	self.remove(subscriberView);
}

function streamCreatedHandler(event) {
	// Subscribe to first stream if I am not on a device
	if ( !subscriber ) {
		Titanium.API.debug("attempting to subscribe to stream " + event.stream.streamId);
		subscriber = session.subscribe(event.stream);
		subscriberView = subscriber.createView({
			width  : 200,
			height : 150,
			top    : 20
		});
		self.add(subscriberLabel);
		self.add(subscriberView);
	}
}

function sessionFailedHandler (event) {
	dismissSpinner();
	alert(event.error.message);
}

function showSpinner() {
	// show connecting modal
	connectingSpinner = Titanium.UI.createActivityIndicator({
		color: 'white',
		message: 'Connecting...',
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height: 200,
		width: 200,
		backgroundColor : 'black',
		borderRadius: 10
	});
	self.add(connectingSpinner);
	connectingSpinner.show();
}

function dismissSpinner() {
	// Dismiss spinner
	connectingSpinner.hide();
	self.remove(connectingSpinner);
	self.layout = 'vertical';
}

module.exports = HelloView;
