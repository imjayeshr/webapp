var expect  = require('chai').expect;
var request = require('request');


// Send a test request to the /test REST Endpoint to check if the node server is up and running 
it('Server test response', function(done) {
    request('http://localhost:3301/test' , function(error, response, body) {
        expect(body).to.equal('The server is up and running!');
        done();
    });
});