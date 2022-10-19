const request = require("supertest");
const app = require("../app");

const mongoose = require('mongoose');
const User = require("../models/user")
const mongoURL = "mongodb://localhost:27017/csce606"

describe("testing register", function () {
    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', () => console.log('connected to database'));
        mongoose.connection.on('error', (error) => console.error('database error', error));
    });
    afterEach(async() => {
        const { users } = mongoose.connection.collections;
        await users.drop();
    });
    afterAll(async() => {
        await mongoose.connection.close()
        console.log("close dataset")
    });

    test("testing register successfully", async() => {
        // username = , password = 
        account = {username: "aa", password: "aa", email: "aa@gmail.com"};
        const res = await request(app).post('/register').send(account);
    });
    // test("testing invalid username format", () => {
    //     // "%20", "!" ...
    //     // await users.register(req, res);
    // });
    // test("testign invalid email format", () => {
    //     // without "@"
    //     // await users.register(req, res);
    // });
});