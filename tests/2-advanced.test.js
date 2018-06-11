const chai = require('chai');
const chaiHttp = require('chai-http');
const { default: startServer } = require('../build/server');

const { expect } = chai;

// Begin advanced tests
startServer().then(function(server) {
  chai.use(chaiHttp);
  const { request } = chai;

  describe('Server', function() {
    // Test '/api/puppies' endpoint
    it('should have a functioning /api/puppies endpoint', function(done) {
      request(server)
        .get('/api/puppies')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.property('body');

          // Expectations for 'res.body'
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body).to.have.property('message', 'Puppies API was hit!');
          done();
        });
    });

    // Test unexpected endpoint
    it('should return 404 on unknown routes', function(done) {
      request(server)
        .get('/asdfasdf')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
        });
      done();
    });
  });
});
