const request = require("supertest");
const app = require("../app");

const mongoose = require('mongoose');
const User = require("../models/user")
const mongoURL = "mongodb://127.0.0.1:27017/csce606"

describe("testing login", function () {
    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', () => console.log('connected to database'));
        mongoose.connection.on('error', (error) => console.error('database error', error));
    });
    beforeEach(async() => {
        query = {username: "aa", password: "aa", email: "aa@gmail.com"};
        const res = await request(app).post('/register').send(query);
    });
    afterEach(async() => {
        // const { users } = mongoose.connection.collections;
        // await users.drop();
    });
    afterAll(async() => {
        await mongoose.connection.close()
        console.log("close dataset")
    });

    test("testing login successfully ", async() => {
        // username = , password = 
        account = {username: "aa", password: "aa"};
        await request(app).post("/login").send(account);
    });
    // test("testing invalid username format", () => {
    //     // "%20", "!" ...
    // });
    // test("testing wrong username", async () => {
    //     // username not in dataset
    // });
    // test("testing wrong password", async () => {
    //     // correct unsername with wrong password
    // });
});