const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const {searchByEmail} = require("../../controllers/students")

describe("testing searchByEmail", function () {
    let student;
    let instructor;
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
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("search the student successfully", async() => {
        const req = {body: {studentEmail: "aa@gmail.com"}};
        await searchByEmail(req, res);
        expect(res.text.username).toEqual("aaa")
    });
    test("the holder of the email is instructor", async() => {
        const req = {body: {studentEmail: "bb@gmail.com"}};
        await searchByEmail(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("This is not a student");
    });
    test("the email does not exist", async() => {
        const req = {body: {studentEmail: "cc@gmail.com"}};
        await searchByEmail(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Student not found!!");
    });
    test("invalid email format", async() => {
        const req = {body: {studentEmail: "gmail.com"}};
        await searchByEmail(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Invalid email format");
    });
})