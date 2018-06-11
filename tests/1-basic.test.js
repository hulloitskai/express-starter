const chai = require('chai');
const chaiHttp = require('chai-http');
const { default: startServer } = require('../build/server');

const { expect } = chai;

// Ensure testing environment is configured
const { NODE_ENV } = process.env;
expect(NODE_ENV).to.equal('test');
expect(startServer).to.be.a('function');

// Begin basic tests
startServer().then(function(server) {
  chai.use(chaiHttp);
  const { request } = chai;

  // Test '/' endpoint
  // prettier-ignore
  request(server).get('/') .end(function(err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
  });

  // Test '/api' endpoint
  // prettier-ignore
  request(server).get('/api').end(function (err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    expect(res).to.be.text;
    expect(res).to.include({ text: '"The API is working!"' });
  });
});
