const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Course = require("../../models").Course
const {myHomePage} = require("../../controllers/recruiters")


describe("testing myHomePage", function () {
    let student;
    let recruiter;
    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', ()=>{});
        mongoose.connection.on('error', (error) => console.error('database error', error));
        student = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        await student.save();
        recruiter = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "recruiter",
            company: "Meta QQ"
        });
        await recruiter.save();
        course = new Course({
            name: "python"
        });
        await course.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("get request by recruiter", async() => {
        const req = {user:{_id: recruiter._id}};
        const res = {
            text: "",
            statusCode: "",
            status: function(input){this.statusCode = input; return this;},
            send: function(input){this.text = input;}
        }
        await myHomePage(req, res);
        expect(res.text._id).toEqual(recruiter._id)
    });
    test("get request by student", async() => {
        const req = {user:{_id: student.id}};
        const res = {
            text: "",
            statusCode: "",
            status: function(input){this.statusCode = input; return this;},
            send: function(input){this.text = input;}
        }
        await myHomePage(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not a recruiter");
    });
    test("get request by wrong ID", async() => {
        const req = {user:{_id: course._id}};
        const res = {
            text: "",
            statusCode: "",
            status: function(input){this.statusCode = input; return this;},
            send: function(input){this.text = input;}
        }
        await myHomePage(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot get myHomePage!!");
    });
})