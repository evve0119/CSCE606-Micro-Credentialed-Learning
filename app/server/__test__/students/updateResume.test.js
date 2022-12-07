const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const {User, Credential, Resume} = require("../../models")
const {updateResume} = require("../../controllers/students")

describe("testing updateResume", function () {
    let student;
    let instructor;
    let resume;
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
        let credential = new Credential({name: "python"});
        await credential.save();
        student.credentials.push(credential._id);
        credential = new Credential({name: "java"});
        await credential.save();
        student.credentials.push(credential._id);
        await student.save();
        resume = new Resume({
            name: "software",
            profile: {
                firstName: "Ken", 
                lastName: "student", 
                email: "student@gmail.com",
                phone: "0123456789"},
            credentials: [credential._id],
            holder: student._id,
        })
        await resume.save();
        student.resumes.push(resume);
        await student.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("update resume name", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: student.resumes[0]},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Ken", lastName: "student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newResume = await Resume.findById(currentStudent.resumes[0])
        expect(newResume.name).toEqual("Programming");
        expect(newResume.profile.firstName).toEqual("Ken");
    });

    test("update profile", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: student.resumes[0]},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Justin", lastName: "Student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newResume = await Resume.findById(currentStudent.resumes[0])
        expect(newResume.profile.firstName).toEqual("Justin");
        expect(newResume.profile.lastName).toEqual("Student");
    });
    test("add credentials into resume", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: student.resumes[0]},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Ken", lastName: "student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1], student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newResume = await Resume.findById(currentStudent.resumes[0])
        expect(newResume.credentials.length).toBe(2);
    });
    test("delete credentials from resume", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: student.resumes[0]},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Ken", lastName: "student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newResume = await Resume.findById(currentStudent.resumes[0])
        expect(newResume.credentials.length).toBe(1);
    });
    test("update by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     params: {resumeId: student.resumes[0]},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Ken", lastName: "student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("update without user ID", async() => {
        const req = {user: {_id: ""},
                     params: {resumeId: student.resumes[0]},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Ken", lastName: "student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("update without resume ID", async() => {
        const req = {user: {_id: student._id},
                     params: {resumeId: ""},
                     body: {resumeName: "Programming",
                            addProfile: {firstName: "Ken", lastName: "student", 
                            email: "student@gmail.com", phone: "0123456789"},
                            addCredentials: [student.credentials[1]]}};
        await updateResume(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot update resume!!");
    });
})