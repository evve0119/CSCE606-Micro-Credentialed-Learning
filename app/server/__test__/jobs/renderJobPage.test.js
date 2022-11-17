const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Job = require("../../models").Job
const { renderJobPage } = require("../../controllers/jobs");

describe("testing renderJobPage", function () {
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

    test("render job page", async () => {
        req = { params: { id: job1._id } };
        await renderJobPage(req, res);
        expect(res.text._id).toEqual(job1._id)
    });

    test("input not id", async () => {
        req = { params: { id: "aaaaa" } };
        await renderJobPage(req, res);
        expect(res.text).toEqual("Job does not exist")
    });

})