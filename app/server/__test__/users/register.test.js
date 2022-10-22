const request = require("supertest")
const app = require("../../app")
const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"

describe("testing register", function () {
    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', ()=>{});
        mongoose.connection.on('error', (error) => console.error('database error', error));
    });
    afterEach(async() => {
        const { users } = mongoose.connection.collections;
        const num = await users.count();
        if (num != 0){
            await users.drop();
        }
    });
    afterAll(async() => {
        await mongoose.connection.close()
    });

    test("register successfully", async() => {
        const account = {username: "aaa", password: "aaaaaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("success");
    });
    // username
    test("register without username", async() => {
        const account = {password: "aaaaaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"username\" is required");
    });
    test("the username contains invalid symbols", async() => {
        const account = {username: "!@#", password: "aaaaaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Invalid user name");
    });
    test("the username is too short", async() => {
        const account = {username: "aa", password: "aaaaaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"username\" length must be at least 3 characters long");
    });
    test("the username is too long", async() => {
        const account = {username: "aa".repeat(30), password: "aaaaaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"username\" length must be less than or equal to 50 characters long");
    });
    // password
    test("register without password", async() => {
        const account = {username: "aaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"password\" is required");
    });
    test("the password is too short", async() => {
        const account = {username: "aaa", password: "aaa", email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"password\" length must be at least 6 characters long");
    });
    test("the password is too long", async() => {
        const account = {username: "aaa", password: "aaaaaa".repeat(50), email: "aa@gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"password\" length must be less than or equal to 255 characters long");
    });
    // email
    test("register with existed email", async() => {
        const account = {username: "aaa", password: "aaaaaa", email: "aa@gmail.com", role: "student"};
        await request(app).post("/api/user/register").send(account);
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Email has already been registered.");
    });
    test("register without email", async() => {
        const account = {username: "aaa", password: "aaaaaa", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"email\" is required");
    });
    test("register with invalid email format", async() => {
        const account = {username: "aaa", password: "aaaaaa", email: "gmail.com", role: "student"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"email\" must be a valid email");
    });
    // role
    test("register without role", async() => {
        const account = {username: "aaa", password: "aaaaaa", email: "aa@gmail.com"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"role\" is required");
    });
    test("register with unexpected role", async() => {
        const account = {username: "aaa", password: "aaaaaa", email: "aa@gmail.com", role: "engineer"};
        const res = await request(app).post("/api/user/register").send(account);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("\"role\" must be one of [student, instructor]");
    });
});