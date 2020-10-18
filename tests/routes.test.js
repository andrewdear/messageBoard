const chai = require("chai");

const expect = chai.expect;
const url = "http://0.0.0.0:8080";
const request = require("supertest")(url);

describe("Messages", () => {

    it("should not have any messages at start", (done) => {
        request.get("/api/message")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.be.an("array").that.is.empty;
                done();
            })
    });

    it("should return errors for missing fields on post to message", (done) => {
        request.post("/api/message")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors).to.be.an("array").that.does.include("Screen Name Required");
                expect(res.body.errors).to.be.an("array").that.does.include("Message Required");
                done();
            })
    });

    it("should return correct error for missing message", (done) => {
        request.post("/api/message")
            .expect(200)
            .send({screenName: "hello"})
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors).to.be.an("array").that.does.not.include("Screen Name Required");
                expect(res.body.errors).to.be.an("array").that.does.include("Message Required");
                done();
            })
    });

    it("should return correct error for missing screenName", (done) => {
        request.post("/api/message")
            .expect(200)
            .send({message: "world"})
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors).to.be.an("array").that.does.include("Screen Name Required");
                expect(res.body.errors).to.be.an("array").that.does.not.include("Message Required");
                done();
            })
    });

    it("should return message, screenName and createdAt on successfull message post", (done) => {
        request.post("/api/message")
            .expect(200)
            .send({screenName: "hello", message: "world"})
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.screenName).to.equal("hello");
                expect(res.body.message).to.equal("world");
                // this could be tested better. probably by checking to see if the date was within the last minuet.
                expect(res.body.createdAt).to.be.a("string");

                done();
            })
    });

    it("should return the created post on get", (done) => {
        request.get("/api/message")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body[0].screenName).to.equal("hello");
                expect(res.body[0].message).to.equal("world");
                // this could be tested better. probably by checking to see if the date was within the last minuet.
                expect(res.body[0].createdAt).to.be.a("string");

                done();
            })
    });

    it("should return a second message on get", (done) => {
        // create second message
            request.post("/api/message")
                .expect(200)
                .send({screenName: "hello2", message: "world2"})
                .end(() => {

                    // check for second message
                    request.get("/api/message")
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);

                            expect(res.body.length).to.equal(2);
                            expect(res.body[1].screenName).to.equal("hello2");
                            expect(res.body[1].message).to.equal("world2");
                            expect(res.body[1].createdAt).to.be.a("string");

                            done();})
                })

    });


    // Delete all messages for next run and make sure it worked
    it("should delete all messages", (done) => {
        request.delete("/api/message")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.success).to.equal(true);

                request.get("/api/message")
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.body).to.be.an("array").that.is.empty;
                        done();
                    })
            })
    });



});