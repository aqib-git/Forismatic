const http = require('http')
const querystring = require('querystring')

class Forismatic {

	constructor() {
    console.log("initializing")
		this._formats = ['json', 'xml', 'jsonp', 'html', 'text']
    this._methods = ['getQuote']
    this._langs = ['en', 'ru']
		this._options = {
			method : 'getQuote',
			format : 'json',
			lang : 'en'
		}
	}

  resetOptions() {
    this._options = {
      method : 'getQuote',
      format : 'json',
      lang : 'en'
    }
  }

  /* override default options */
	options(options) {
    if(typeof options !== 'object') {
      return
    }

    if(this.isValidMethod(options.method))
      this._options.method = options.method

    if(this.isValidFormat(options.format))
      this._options.format = options.format

    if(this.isValidLang(options.lang))
      this._options.lang = options.lang

    if(this.isValidKey(options.key))
      this._options.key = options.key

    return this;
	}

  /* get quote from Formistic API*/
	quote(callback) {
    let self = this

		const postData = querystring.stringify(this._options)

		const req = http.request({
      hostname: 'api.forismatic.com',
      path: '/api/1.0/',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Accept-Encoding': '*',
        'Accept-Language': this._options.lang ? this._options.lang : 'en',
        'Accept-Datetime': new Date().toUTCString(),
        'Cache-Control': 'no-cache',
        'Connection': 'close',
        'Date': new Date().toUTCString(),
        'Max-Forwards': 1,
        'Pragma': 'no-cache',
        'TE': 'trailers, deflate',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
      }
    }, (res) => {
			self._quote = ''
			res.setEncoding('utf8')
			res.on('data', (quoteChunk) => self._quote += quoteChunk)
			res.on('end', () => callback(null, self._quote))
		})

		req.on('error', (e) => {
		  callback(err)
		});

		req.write(postData)

		req.end()
	}

  getOptions() {
    return this._options
  }

  isValidLang(lang) {
    return this._langs.indexOf(lang) > 0
  }

  isValidFormat(format) {
      return this._formats.indexOf(format) > 0
  }

  isValidMethod(method) {
    return this._methods.indexOf(method) > 0
  }

  isValidKey(key){
    return !isNaN(parseInt(key))
  }

}

module.exports = new Forismatic()
