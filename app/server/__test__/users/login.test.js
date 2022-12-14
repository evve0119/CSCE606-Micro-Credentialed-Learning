const request = require("supertest")
const app = require("../../app")
const User = require("../../models").User
const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"

describe("testing login", function () {
    let user1;
    let user2;
    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', ()=>{});
        mongoose.connection.on('error', (error) => console.error('database error', error));
        user1 = await new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
            verified: true
        }).save();
        user2 = await new User({
            email: "bb@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
            verified: false
        }).save();
    });
    afterAll(async() => {
        const { users } = mongoose.connection.collections;
        const num = await users.count();
        if (num != 0){
            await users.drop();
        }
        await mongoose.connection.close()
    });

    test("login successfully", async() => {
        const account = {email: "aa@gmail.com", password: "aaaaaa", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(200);
    });
    // password
    test("login with wrong password", async() => {
        const account = {email: "aa@gmail.com", password: "bbbbbb", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Wrong password.");
    });
    test("login without password", async() => {
        const account = {email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"password\" is required");
    });
    test("the password is too short", async() => {
        const account = {password: "aaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"password\" length must be at least 6 characters long");
    });
    test("the password is too long", async() => {
        const account = {password: "aaaaaa".repeat(50), email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"password\" length must be less than or equal to 255 characters long");
    });
    // // email
    test("login with wrong email adress", async() => {
        const account = {password: "aaaaaa", email: "cc@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("The user doesn't exit.");
    });
    test("login without email", async() => {
        const account = {password: "aaaaaa", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"email\" is required");
    });
    test("login with invalid email format", async() => {
        const account = {password: "aaaaaa", email: "gmail.com", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"email\" must be a valid email");
    });
    // // role
    test("login without role", async() => {
        const account = {password: "aaaaaa", email: "aa@gmail.com"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"role\" is required");
    });
    test("login with wrong role", async() => {
        const account = {password: "aaaaaa", email: "aa@gmail.com", role: "instructor"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("You are not a instructor");
    });
    test("login with unexpected role", async() => {
        const account = {password: "aaaaaa", email: "aa@gmail.com", role: "engineer"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"role\" must be one of [student, instructor, recruiter]");
    });
    // login without verification
    test("login without verification", async() => {
        const account = {password: "aaaaaa", email: "bb@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/login").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Email is not verified. A new verification email sent to your account, please verify again.");
    });
});