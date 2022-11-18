const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const {submitResume} = require("../../controllers/students");
const { Resume, Job } = require('../../models');

describe("testing submitResume", function () {
    let student1; let student2; let recruiter;
    let resume; let job; 
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
            email: "student1@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        }); await student.save();
        resume = new Resume({holder: student}); await resume.save();
        student.resumes.push(resume); await student.save();
        recruiter = new User({
            email: "recruiter@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "recruiter"
        }); await recruiter.save();
        job = new Job({name: "soft", holder: recruiter}); await job.save();
        recruiter.jobs.push(job); await recruiter.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("submit resume successfully", async() => {
        const req = {user:{_id: student._id},
                     body:{resumeId: resume._id, jobId: job._id,}};
        await submitResume(req, res);
        expect(res.text).toEqual("Successfully submit!!!");
        const currentJob = await Job.findById(job);
        expect(currentJob.resumes[0]).toEqual(resume._id,);
    });
    test("the user does not hold the resume", async() => {
        const req = {user:{_id: recruiter._id},
                     body:{resumeId: resume, jobId: job}};
        await submitResume(req, res);
        expect(res.text).toEqual("You are not authorized");
        expect(res.statusCode).toBe(400);
    });
    test("submit with wrong resume id", async() => {
        const req = {user:{_id: student._id},
                     body:{resumeId: job, jobId: job}};
        await submitResume(req, res);
        expect(res.text).toEqual("Error!! Cannot submit resume!!");
        expect(res.statusCode).toBe(400);
    });
    test("submit with wrong job id", async() => {
        const req = {user:{_id: student._id},
                     body:{resumeId: resume, jobId: resume}};
        await submitResume(req, res);
        expect(res.text).toEqual("Error!! Cannot submit resume!!");
        expect(res.statusCode).toBe(400);
    });
    test("submit without login", async() => {
        const req = {user:{_id: ""},
                     body:{resumeId: resume, jobId: job}};
        await submitResume(req, res);
        expect(res.text).toEqual("You are not authorized");
        expect(res.statusCode).toBe(400);
    });
})