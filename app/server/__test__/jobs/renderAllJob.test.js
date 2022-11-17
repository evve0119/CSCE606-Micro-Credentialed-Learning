const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Job = require("../../models").Job
const { renderAllJob } = require("../../controllers/jobs");

describe("testing renderAllJob", function () {
    let recruiter
    let job1;
    let job2;
    const res = {
        text: "",
        statusCode: "",
        status: function (input) { this.statusCode = input; return this; },
        send: function (input) { this.text = input; }
    }

    beforeAll(async () => {
        mongoose.connect(mongoURL);
        mongoose.connection.once('open', () => { });
        mongoose.connection.on('error', (error) => console.error('database error', error));
        recruiter = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "recruiter",
        });
        await recruiter.save();
        job1 = new Job({
            name: "python engineer",
            holder: recruiter._id
        });
        await job1.save();
        recruiter.teach.push(job1);
        await recruiter.save();
        job2 = new Job({
            name: "javascript engineer",
            holder: recruiter._id
        });
        await job2.save();
        recruiter.teach.push(job2);
        await recruiter.save();
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("render all jobs", async () => {
        req = {};
        await renderAllJob(req,res);
        expect(res.text.length).toEqual(2)
    });

})