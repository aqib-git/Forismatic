const http = require('http')
const querystring = require('querystring')

class Forismatic {

	constructor(options) {
		
		this.options = {
			method : 'getQuote',
			format : 'json',
			lang : 'en'
		}

	}

	options(options) {
		if(typeof options === 'object') {
			this.options = options
		}
	}

	quote(callback) {
		const postData = querystring.stringify(this.options)

		let httpOptions = {
			hostname: 'api.forismatic.com',
		  	path: '/api/1.0/',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
		    	'Content-Length': Buffer.byteLength(postData),
		    	'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
		  	}
		}
		const req = http.request(httpOptions, (res) => {
			let quote = ''
			res.setEncoding('utf8')
			res.on('data', (quoteChunk) => quote += quoteChunk)
			res.on('end', () => callback(null, JSON.parse(quote)))
		})

		req.on('error', (e) => {
		  callback(err)
		});

		req.write(postData)

		req.end();
	}

}

module.exports = new Forismatic()