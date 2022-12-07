const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Token = require("../../models/token");
const crypto = require("crypto");
const {verifiedEmail} = require("../../controllers/users")


describe("testing verifiedEmail", function () {
    let user1;
    let user2;
    let user1Token;
    let user2Token;
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
        }).save();
        user2 = await new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "student",
        }).save();
        user1Token = await new Token({
            userId: user1._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        user2Token = await new Token({
            userId: user2._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("verify email successfully", async() => {
        const req = {params:{id: user1._id, token: user1Token.token}};
        await verifiedEmail(req, res);
        const currentUser = await User.findById(user1._id)
        expect(res.text).toEqual("Email verified successfully");
        expect(res.statusCode).toBe(200);
        expect(currentUser.verified).toBe(true);
    });
    test("verify with wrong user ID", async() => {
        const req = {params:{id: user1Token._id, token: user2Token.token}};
        await verifiedEmail(req, res);
        const currentUser = await User.findById(user2._id)
        expect(res.text).toEqual("Invalid link");
        expect(res.statusCode).toBe(400);
        expect(currentUser.verified).toBe(false);
    });
    test("verify without wrong token", async() => {
        const req = {params:{id: user2._id, token: user1Token.token}};
        await verifiedEmail(req, res);
        const currentUser = await User.findById(user2._id)
        expect(res.text).toEqual("Invalid link");
        expect(res.statusCode).toBe(400);
        expect(currentUser.verified).toBe(false);
    });
})