import chai from "chai";
import sinon from "sinon";
import request from "request";
import {
    failureBody,
    failureObject
} from './fixtures/fixture.js'
const should = chai.should();

const stub = {
    set: sinon.stub(),
    get: sinon.stub(),
};

const base = "http://localhost:1337/";
describe("422 Bad Request", () => {
    beforeEach(() => {
        stub.get = sinon.stub(request, "get");
    });

    afterEach(() => {
        stub.get.restore();
    });
    describe("GET /city/London/radius/abcd", () => {
        it("Returns invalid input data error for the invalid radius value", (done) => {
            stub.get.yields(null, failureObject, JSON.stringify(failureBody));
            stub.get(`${base}/city/London/radius/abcd`, (err, res, body) => {
                res.statusCode.should.eql(422);
                res.headers["content-type"].should.contain("application/json");
                body = JSON.parse(body);
                body.should.include.keys(
                    "value",
                    "error"
                );
                body.error.message.should.eql(failureBody.error.message);
                done();
            });
        });
    });
});