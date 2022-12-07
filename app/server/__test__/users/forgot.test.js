const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Token = require("../../models/token");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const {forgot} = require("../../controllers/users")


describe("testing forgot", function () {
    let user1;
    let user2;
    let user3;
    let user3Token;
    const res = {
        text: "",
        statusCode: "",
        status: function(input){this.statusCode = input; return this;},
        send: function(input){this.text = input;}
    }

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
        user3 = await new User({
            email: "cc@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
            verified: true
        }).save();
        user3Token = await new Token({
            userId: user3._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("send reset password email successfully", async() => {
        const req = {body:{email: "aa@gmail.com"}};
        await forgot(req, res);
        expect(res.text).toEqual("An Email sent to your account, please verify");
        expect(res.statusCode).toBe(201);
        const currentToken = await Token.findOne({userId: user1._id});
        let exit = currentToken? true : false;
        expect(exit).toBe(true);
    });
    test("wrong email address", async() => {
        const req = {body:{email: "zz@gmail.com"}};
        await forgot(req, res);
        expect(res.text).toEqual("This Email is not registered");
        expect(res.statusCode).toBe(400);
    });
    test("the email address is not verified", async() => {
        const req = {body:{email: "bb@gmail.com"}};
        await forgot(req, res);
        expect(res.text).toEqual("This Email is not verified, please check your inbox");
        expect(res.statusCode).toBe(400);
    });
    test("already have reset password email", async() => {
        const req = {body:{email: "cc@gmail.com"}};
        await forgot(req, res);
        expect(res.text).toEqual("Reset link still valid in your inbox, please reset with the link");
        expect(res.statusCode).toBe(400);
    });
})