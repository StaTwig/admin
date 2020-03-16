var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://34.207.213.121:3500/' , function(error, response, body) {
        expect(body).to.equal('welcome');
        done();
    });
});

it('About page content', function(done) {
    request('http://34.207.213.121:3500/about' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});
