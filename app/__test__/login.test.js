const request = require("supertest");
// const app = require("../app");
const express = require("express")
const app = express()

describe("testing login", function () {
    beforeAll(() =>{
        // connect dataset
    });
    afterAll(() => {
        // disconnect dataset
        // clean dataset
    });

    test("testing login successfully ", () => {
        // username = , password = 
        // const query = {
        //     username: "kk",
        //     passport: "kk"
        // };
        // const res = await request(app).post("/login")
        //     .send({query});
    });
    test("testing invalid username format", () => {
        // "%20", "!" ...
    });
    test("testing wrong username", async () => {
        // username not in dataset
    });
    test("testing wrong password", async () => {
        // correct unsername with wrong password
    });
});