const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Token = require("../../models/token");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const {resetPassword} = require("../../controllers/users")


describe("testing resetPassword", function () {
    let user1;
    let user1Token;
    let user2;
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
        user1Token = await new Token({
            userId: user1._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        user2 = await new User({
            email: "bb@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
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

    test("reset password successfully", async() => {
        const req = {
            body:{id: user1._id, token: user1Token.token,
            newPassword: "bbbbbb", confirmPassword: "bbbbbb"}
        };
        await resetPassword(req, res);
        expect(res.text).toEqual("Password update successfully");
        expect(res.statusCode).toBe(200);
        const currentUser = await User.findById(user1._id);
        bcrypt.compare("bbbbbb", currentUser.password)
        .then((res) => {
            expect(res).toBe(true);
        });
    });
    test("reset with wrong user ID", async() => {
        const req = {
            body:{id: user1Token._id, token: user1Token.token,
                newPassword: "bbbbbb", confirmPassword: "bbbbbb"}
        };
        await resetPassword(req, res);
        expect(res.text).toEqual("User not found");
        expect(res.statusCode).toBe(400);
    });
    test("reset without token", async() => {
        const req = {
            body:{id: user2._id, token: "",
                newPassword: "bbbbbb", confirmPassword: "bbbbbb"}
        };
        await resetPassword(req, res);
        expect(res.text).toEqual("Invalid link");
        expect(res.statusCode).toBe(400);
    });
    test("new password is too short", async() => {
        const req = {
            body:{id: user2._id, token: user2Token.token,
                newPassword: "bbb", confirmPassword: "bbb"}
        };
        await resetPassword(req, res);
        expect(res.text).toEqual("\"newPassword\" length must be at least 6 characters long");
        expect(res.statusCode).toBe(400);
    });
    test("new password and confirm password are different", async() => {
        const req = {
            body:{id: user2._id, token: user2Token.token,
                newPassword: "bbbbbb", confirmPassword: "cccccc"}
        };
        await resetPassword(req, res);
        expect(res.text).toEqual("Password not match");
        expect(res.statusCode).toBe(400);
    });
})