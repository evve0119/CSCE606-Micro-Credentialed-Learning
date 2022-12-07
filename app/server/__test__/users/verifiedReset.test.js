const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Token = require("../../models/token");
const crypto = require("crypto");
const {verifiedReset} = require("../../controllers/users")


describe("testing verifiedReset", function () {
    let user;
    let userToken;

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
        user = await new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        }).save();
        userToken = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("verify email successfully", async() => {
        const req = {params:{id: user._id, token: userToken.token}};
        await verifiedReset(req, res);
        expect(res.text).toEqual("Link is correct");
        expect(res.statusCode).toBe(200);
    });
    test("verify without user ID", async() => {
        const req = {params:{id: userToken._id, token: userToken.token}};
        await verifiedReset(req, res);
        expect(res.text).toEqual("Invalid link");
        expect(res.statusCode).toBe(400);
    });
    test("verify without token", async() => {
        const req = {params:{id: user._id, token: ""}};
        await verifiedReset(req, res);
        expect(res.text).toEqual("Invalid link");
        expect(res.statusCode).toBe(400);
    });
})