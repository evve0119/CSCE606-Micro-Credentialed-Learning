const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const { renderProfileForm } = require("../../controllers/recruiters");

describe("testing renderProfileForm", function () {
    let recruiter
    let student
    const res = {
        text: "",
        statusCode: "",
        status: function (input) { this.statusCode = input; return this; },
        send: function (input) { this.text = input; }
    }

    beforeAll(async () => {
        mongoose.connect(mongoURL);
        mongoose.connection.once('open', () => { });
        mongoose.connection.on('error', (error) => console.error('database error', error));
        recruiter = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "recruiter",
            company: "Meta QQ"
        });
        await recruiter.save();
        student = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        await student.save();
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("owner render profile form", async () => {
        const req = { user: { _id: recruiter._id } };
        await renderProfileForm(req, res);
        expect(res.text.company).toEqual(recruiter.company)
    });

    test("other roles render profile form", async () => {
        const req = { user: { _id: student._id } };
        await renderProfileForm(req, res);
        expect(res.text).toEqual("You are not a recruiter")
    });

    test("no login render profile form", async () => {
        const req = { user: { _id: "aaaaa" } };
        await renderProfileForm(req, res);
        expect(res.text).toEqual("Error!! Cannot get profile!!")
    });

})