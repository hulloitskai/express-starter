const chai = require('chai');
const chaiHttp = require('chai-http');
const { default: startServer } = require('../build/server');
const { expect } = chai;

// Begin environment test
describe('Environment', function() {
  // Ensure testing environment is configured
  it('should be configured for testing', function() {
    expect(process.env.NODE_ENV).to.equal('test');
    expect(startServer).to.be.a('function');
  });
});

// Begin basic tests
startServer().then(function(server) {
  chai.use(chaiHttp);
  const { request } = chai;

  describe('Server', function() {
    // Test '/' endpoint
    it('should have an index route', function(done) {
      request(server)
        .get('/')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    // Test '/api' endpoint
    it('should have an /api route', function(done) {
      request(server)
        .get('/api')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.text;
          expect(res).to.include({ text: '"The API is working!"' });
          done();
        });
    });

  });
});
