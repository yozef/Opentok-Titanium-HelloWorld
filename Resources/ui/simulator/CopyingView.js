var self;

function CopyingView(_args) {
	if (Ti.Platform.getArchitecture === 'arm' || !(Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad')) {
		Ti.API.debug('Tried to initialize a CopyingView on an invalid platform');
		return null;
	}
	
	self = Ti.UI.createButton(_args);
	
	self.editable = false;
	self.title = _args.initialMessage;
	
	// This is the stuff we care about
	self.copyText = _args.copyText || '';
	self.lastMessage = _args.lastMessage || 'Now Paste (⌘+V)';
	
	self.addEventListener('click', firstClickHandler);
	
	return self;
}

function firstClickHandler(event) {
	// Copy to the device's clipboard
	Ti.UI.Clipboard.setText(self.copyText);
	
	// Tell user to copy to the Mac clipboard
	self.title = "Now press ⌘+C to copy, then Tap again";
	
	self.removeEventListener('click', firstClickHandler);
	self.addEventListener('click', secondClickHandler);
}

function secondClickHandler(event) {
	
	// Tell user to paste the URL in the browser
	self.title = self.lastMessage;
	self.enabled = false;
	
	self.removeEventListener('click', secondClickHandler);
}

module.exports = CopyingView;
