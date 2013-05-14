var CONFIG  = {
	apiKey    : '20251752', // Add your API Key here. Get one at https://dashboard.tokbox.com
	token     : 'T1==cGFydG5lcl9pZD0yMDI1MTc1MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz05NDA3NGRkMDUyMDVkYjMyODA1YTE4YjUwNzU3YWU4NGU4Y2NhM2ZkOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDR5TURJMU1UYzFNbjR4TWpjdU1DNHdMakYtVkhWbElFMWhlU0F4TkNBd01EbzFOam96TkNCUVJGUWdNakF4TTM0d0xqZ3dOVEkzTXpnemZnJmNyZWF0ZV90aW1lPTEzNjg1MTgyMDQmbm9uY2U9MC4xNDk4OTA5NzI3Nzc1NzYzNSZleHBpcmVfdGltZT0xMzY4NjA0NjA0JmNvbm5lY3Rpb25fZGF0YT0=', // Add your generated token here. Generate on at https://dashboard.tokbox.com/projects
	sessionId : '1_MX4yMDI1MTc1Mn4xMjcuMC4wLjF-VHVlIE1heSAxNCAwMDo1NjozNCBQRFQgMjAxM34wLjgwNTI3Mzgzfg', // Add your generated Session ID here. Generated from above.
	baseUrl   : 'http://opentok.github.com/opentok-titanium-mobile/simulator-test.html'
}

CONFIG.webUrl = CONFIG.baseUrl + '#apiKey=' + encodeURIComponent(CONFIG.apiKey) + '&token=' + encodeURIComponent(CONFIG.token) + '&sessionId=' + encodeURIComponent(CONFIG.sessionId);

module.exports = CONFIG
