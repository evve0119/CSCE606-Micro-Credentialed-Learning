const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Job = require("../../models").Job
const {createNewJob} = require("../../controllers/recruiters")

describe("testing createNewJob", function () {
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
            company: "Meta QQ",
        });
        await recruiter.save();

        job = new Job({
            name: "software engineering",
            holder: recruiter._id,
            description: "testtesttest"
        });
        recruiter.jobs.push(job);
        await recruiter.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("create new job", async() => {
        const req = {user: {_id: recruiter._id},
                     params: {id: recruiter._id},
                     body: {jobName: "software engineering", description: "cool"}};
        await createNewJob(req, res);
        expect(res.text).toEqual("Successfully add new job");
    });
    test("create new job by student", async() => {
        const req = {user: {_id: student._id},
                    params: {id: student._id},
                    body: {jobName: "software engineering", description: "cool"}};
        await createNewJob(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not a recruiter");
    });
    test("create new job by wrong ID", async() => {
        const req = {user: {_id: job._id},
                     params: {id: job._id},
                     body: {jobName: "software engineering", description: "cool"}};
        await createNewJob(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Failed to create");
    });
})
