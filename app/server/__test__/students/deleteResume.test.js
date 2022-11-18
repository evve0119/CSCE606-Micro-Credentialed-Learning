const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const {User, Resume} = require("../../models")
const {deleteResume} = require("../../controllers/students")

describe("testing deleteResume", function () {
    let student;
    let instructor;
    let resume1;
    let resume2;
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
        resume1 = new Resume({name: "programming", holder: student});
        await resume1.save();
        student.resumes.push(resume1._id);
        resume2 = new Resume({name: "dancing", holder: student});
        await resume2.save()
        student.resumes.push(resume2._id);
        await student.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("delete resume", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: resume1._id}};
        await deleteResume(req, res);
        expect(res.text).toEqual("Successfully delete!!!");
        const currentStudent = await User.findById(student._id);
        expect(currentStudent.resumes.length).toBe(1);
        const currentResume = await Resume.findById(resume1._id);
        expect(currentResume).toEqual(null);
    });
    test("delete by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     params: {resumeId: resume2._id}};
        await deleteResume(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("You are not authorized");
    });
    test("delete without user ID", async() => {
        const req = {user: {_id: ""},
                     params: {resumeId: resume2._id}};
        await deleteResume(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("You are not authorized");
    });
    test("delete without resume ID", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: ""}};
        await deleteResume(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot delete resume!!");
    });
})