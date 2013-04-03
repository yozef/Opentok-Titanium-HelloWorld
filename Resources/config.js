var CONFIG  = {
	apiKey    : '', // Add your API Key here. Get one at https://dashboard.tokbox.com
	token     : '', // Add your generated token here. Generate on at https://dashboard.tokbox.com/projects
	sessionId : '', // Add your generated Session ID here. Generated from above.
	baseUrl   : 'http://opentok.github.com/opentok-titanium-mobile/simulator-test.html'
}

CONFIG.webUrl = CONFIG.baseUrl + '#apiKey=' + encodeURIComponent(CONFIG.apiKey) + '&token=' + encodeURIComponent(CONFIG.token) + '&sessionId=' + encodeURIComponent(CONFIG.sessionId);

module.exports = CONFIG
