const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET login', () => {
  it('it should return the login view', (done) => {
    chai.request(server)
      .get('/login')
      .end((err, res) => {
        chai.expect(() => {
          if (res.statusCode !== 200 && res.statusCode !== 304) {
            throw Error(`unexpected status code: ${res.statusCode}`);
          }
        });
        done();
      });
  });
});
