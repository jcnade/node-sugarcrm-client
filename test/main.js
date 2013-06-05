"use strict";

var should = require('should');

var sugar = require('../lib/main');


describe('sugar.init()', function() {
    describe('Checking sugar.init() and sugar.configInfo()', function() {
        it('without any argument', function(done) {
        	sugar.init(
							{
								apiURL:  "test1",
								login:   "test2",
								passwd:  "test3"
							}
     					);
        	sugar.configInfo()
            var result = sugar.configInfo();
                result.should.eql({apiURL:"test1",login:"test2",passwd:"test3"});
                done();
            });
        });
});


