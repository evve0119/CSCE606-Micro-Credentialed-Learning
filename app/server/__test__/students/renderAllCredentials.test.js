const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Course = require("../../models").Course
const Credential = require("../../models").Credential
const {renderAllCredentials} = require("../../controllers/students")

describe("testing render all credentials", function () {
    let student;
    let instructor;
    let course;
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
        student = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        await student.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
        course = new Course({
            name: "python"
        });
        await course.save();
        let credential = new Credential({name: "python"})
        await credential.save();
        student.credentials.push(credential._id)
        credential = new Credential({name: "java"})
        await credential.save();
        student.credentials.push(credential._id)
        await student.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("get request by student", async() => {
        const req = {user:{_id: student._id}};
        await renderAllCredentials(req, res);
        expect(res.text[0].name).toEqual("python")
        expect(res.text[1].name).toEqual("java")
    });
    test("get request by instructor", async() => {
        const req = {user:{_id: instructor._id}};
        await renderAllCredentials(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not a student");
    });
    test("get request by wrong ID", async() => {
        const req = {user:{_id: course._id}};
        await renderAllCredentials(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot get credential!!");
    });
})