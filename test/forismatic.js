const expect = require('chai').expect
const forismatic = require('../forismatic')

describe('forismatic suite', function() {

  const defaultOptions = {
    method : 'getQuote',
    format : 'json',
    lang : 'en'
  }

  describe('init', function() {
    it('should have correct default options', function(){
      expect(forismatic.getOptions()).to.deep.include(defaultOptions)
    })
  })

  describe('functions', function(){
    describe('#options', function() {
      it('should update default options', function(){
        forismatic.options({
          format : 'xml',
          lang : 'ru'
        })
        expect(forismatic.getOptions()).to.deep.include({
          format : 'xml',
          lang : 'ru'
        })
      })
      it('should not update default options if options passed are incorrect', function(){
        forismatic.resetOptions()
        forismatic.options({
          method : 'getQuote3',
          format : 'jsonn',
          lang : 'rm'
        })
        expect(forismatic.getOptions()).to.deep.include(defaultOptions)
      })
    })
    describe('#resetOptions', function(){
      it('should reset options to default values', function(){
        forismatic.resetOptions()
        expect(forismatic.getOptions()).to.deep.include(defaultOptions)
      })
    })
  })

})
