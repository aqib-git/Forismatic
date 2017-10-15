const forismatic = require('./forismatic')


forismatic.quote((err, quote) => {
	if(err) {
		return console.log(err)
	}
	console.log(quote.quoteText)
})