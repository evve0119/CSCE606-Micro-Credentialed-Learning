const users = require("../controllers/users");
const request = require("supertest");
// const app = require("../app")
const express = require("express")
const app = express()

describe("testing register", function () {
    beforeAll(() =>{
        // connect dataset
    });
    afterAll(() => {
        // disconnect dataset
        // clean dataset
    });

    test("testing register successfully", () => {
        // username = , password = 
        // const req = {
        //     body: {username: "aa", password: "aa", email: "aa@gmail.com"}
        // },
        // res = {};
        // await users.register(req, res);
    });
    test("testing invalid username format", () => {
        // "%20", "!" ...
        // await users.register(req, res);
    });
    test("testign invalid email format", () => {
        // without "@"
        // await users.register(req, res);
    });
});