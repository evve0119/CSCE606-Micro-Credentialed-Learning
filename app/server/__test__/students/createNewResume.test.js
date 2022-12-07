const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const {User, Credential, Resume} = require("../../models");
const {createNewResume} = require("../../controllers/students");

describe("testing createNewResume", function () {
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
        let credential = new Credential({name: "python"});
        await credential.save();
        student.credentials.push(credential._id);
        credential = new Credential({name: "Java"});
        await credential.save();
        student.credentials.push(credential._id);
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

    test("create new resume", async() => {
        const req = {user: {_id: student._id},
                     body: {resumeName: "software",
                            addProfile: {firstName: "Ken", phone:"0123456789"},
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await createNewResume(req, res);
        expect(res.text).toEqual("Successfully create new resume");
        const currentStudent = await User.findById(student._id);
        const newResume = await Resume.findById(currentStudent.resumes[0]);
        expect(newResume.name).toEqual("software");
        expect(newResume.profile.firstName).toEqual("Ken");
        expect(newResume.profile.phone).toEqual("0123456789");
        expect(newResume.profile.lastName).toEqual("");
        expect(newResume.credentials.length).toBe(2);
    });
    test("create new resume by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     body: {resumeName: "software",
                            addprofile: {firstName: "Ken", phone:"0123456789"},
                            credentials: [student.credentials[0], student.credentials[1]]}};
        await createNewResume(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("create new resume without login", async() => {
        const req = {user: {_id: ""},
                     body: {resumeName: "software",
                            addprofile: {firstName: "Ken", phone:"0123456789"},
                            credentials: [student.credentials[0], student.credentials[1]]}};
        await createNewResume(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Failed to create");
    });
})