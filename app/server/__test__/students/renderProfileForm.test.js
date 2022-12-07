const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const {renderProfileForm} = require("../../controllers/students")

describe("testing renderProfileForm", function () {
    let student; let instructor;
    const res = {
        text: "",
        statusCode: "",
        status: function(input){this.statusCode = input; return this;},
        send: function(input){this.text = input;}
    };

    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', ()=>{});
        mongoose.connection.on('error', (error) => console.error('database error', error));
        student = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
            profile:{firstName: "Ken", phone: "0123456789" }
        });
        await student.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("get request by student", async() => {
        const req = {user:{_id: student._id}};
        await renderProfileForm(req, res);
        expect(res.text.firstName).toEqual("Ken");
        expect(res.text.phone).toEqual("0123456789");
    });
    test("get request by instructor", async() => {
        const req = {user:{_id: instructor._id}};
        await renderProfileForm(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("get request without login", async() => {
        const req = {user:{_id: ""}};
        await renderProfileForm(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot get ProfileForm!!");
    });
})