const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Job = require("../../models").Job
const {deleteJob} = require("../../controllers/recruiters")


describe("testing updateJob", function () {
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

    test("Someone update is not recruiter", async () => {
        const req = {user:{_id: student._id},
                     params: {jobId: job._id}};
        await deleteJob(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("You are not authorized");
    });

    test("delete the job", async() => {
        const req = {user:{_id: recruiter._id},
                     params: {jobId: job._id}};
        await deleteJob(req, res);
        console.log(res.text)
        expect(res.text).toEqual("Successfully delete!!!")
    });

    test("get request by wrong ID", async() => {
        const req = {user:{_id: job._id},
                     params: {id: recruiter._id}};
        await deleteJob(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.text).toEqual("Delete fail!");
    });


})
