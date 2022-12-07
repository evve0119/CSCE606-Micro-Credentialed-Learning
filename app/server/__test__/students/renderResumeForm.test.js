const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const {User, Resume, Credential} = require("../../models")
const {renderResumeForm} = require("../../controllers/students")

describe("testing renderResumeForm", function () {
    let student;
    let instructor;
    let resume;
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
        await student.save();
        resume = new Resume({
            name: "software", profile: {firstName: "Ken", phone: "0123456789"},
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

    test("get request by student", async() => {
        const req = {params: {resumeId: resume._id}};
        await renderResumeForm(req, res);
        expect(res.text.name).toEqual("software");
        expect(res.text.profile.firstName).toEqual("Ken");
        expect(res.text.profile.lastName).toEqual("");
        expect(res.text.credentials[0].name).toEqual("python");
    });
})