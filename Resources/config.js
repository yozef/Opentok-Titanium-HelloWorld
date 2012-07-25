var CONFIG  = {
	apiKey    : '', // Add your API Key here. Get one at http://www.tokbox.com/opentok/api/tools/js/apikey
	token     : '', // Add your generated token here. Generate on at http://www.tokbox.com/opentok/api/tools/generator
	sessionId : '', // Add your generated Session ID here. Generated from above.
	baseUrl   : 'http://opentok.github.com/opentok-titanium-mobile/simulator-test.html'
}

CONFIG.webUrl = CONFIG.baseUrl + '#apiKey=' + encodeURIComponent(CONFIG.apiKey) + '&token=' + encodeURIComponent(CONFIG.token) + '&sessionId=' + encodeURIComponent(CONFIG.sessionId);

module.exports = CONFIG
