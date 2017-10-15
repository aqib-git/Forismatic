const forismatic = require('./forismatic')


forismatic.options({
  format : 'xml',
  lang : 'en',
  key : 1333
}).quote((err, quote) => {
	if(err) {
		return console.log(err)
	}
	console.log(quote)
})
