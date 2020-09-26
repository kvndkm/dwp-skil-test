import chai from "chai";
import sinon from "sinon";
import request from "request";
import {
    responseBody,
    responseObject
} from './fixtures/fixture.js'
const should = chai.should();

const stub = {
    set: sinon.stub(),
    get: sinon.stub(),
};

const base = "http://localhost:1337/";
describe("when stubbed", () => {
    beforeEach(() => {
        stub.get = sinon.stub(request, "get");
    });

    afterEach(() => {
        stub.get.restore();
    });
    describe("GET /city/London/radius/50", () => {
        it("it should return users around London within 50 miles radius", (done) => {
            stub.get.yields(null, responseObject, JSON.stringify(responseBody));
            stub.get(`${base}/city/London/radius/50`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers["content-type"].should.contain("application/json");
                body = JSON.parse(body);
                body.length.should.eql(1);
                body[0].should.include.keys(
                    "id",
                    "first_name",
                    "last_name",
                    "email",
                    "ip_address",
                    "latitude",
                    "longitude",
                    "distance"
                );
                body[0].distance.should.eql(responseBody[0].distance);
                done();
            });
        });
    });
});