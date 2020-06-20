var expect  = require('chai').expect;
var request = require('request');
var indexFile = require('../../index')

/*
Send a test request to the /test REST Endpoint to check if the node server is up and running 
it('Server test response', function(done) {
    request('http://localhost:3301/test' , function(error, response, body) {
        expect(body).to.equal('The server is up and running!');
        done();
    });
});

*/ 

/* Test */
it('Index file test cases passed', function(){
    var result = indexFile(12,4);
    expect(result).to.equal(16);
});