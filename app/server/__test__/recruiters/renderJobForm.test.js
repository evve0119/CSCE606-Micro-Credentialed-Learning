const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Job = require("../../models").Job
const {renderJobForm} = require("../../controllers/recruiters")

describe("testing renderCourseForm", function () {
    let student;
    let recruiter;
    let job;
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
        recruiter = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "recruiter",
            company: "Meta QQ"
        });
        await recruiter.save();
        job = new Job({
            name: "software engineering",
            holder: recruiter._id,
            description: "testtesttest"
        });
        await job.save();
        recruiter.jobs.push(job);
        await recruiter.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("get request by holder", async() => {
        const req = {user:{_id: recruiter._id},
                     params: {jobId: job._id}};
        await renderJobForm(req, res);
        expect(res.text.name).toEqual("software engineering")
    });
    test("get request by others", async() => {
        const req = {user:{_id: student._id},
                     params: {jobId: job._id}};
        await renderJobForm(req, res);
        expect(res.statusCode).toBe(403);
        // console.log(res.text)
        expect(res.text).toEqual("You are not authorized");
    });
    test("get request by wrong ID", async() => {
        const req = {user:{_id: job._id},
                     params: {id: recruiter._id}};
        await renderJobForm(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Job does not exist");
    });
})