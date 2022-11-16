const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Job = require("../../models").Job
const {searchJobByTitle} = require("../../controllers/jobs");

describe("testing searchJobByTitle", function () {
    let recruiter
    let job1;
    let job2;
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
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("search by python", async() => {
        const req = {body: {searchedJobs: "python"}};
        await searchJobByTitle(req, res);
        expect(res.text[0]._id).toEqual(job1._id)
        expect(res.text.length).toEqual(1)
    });

    test("search by engineer", async() => {
        const req = {body: {searchedJobs: "engineer"}};
        await searchJobByTitle(req, res);
        expect(res.text.length).toEqual(2)
    });

    test("search by aaaaaaaa", async() => {
        const req = {body: {searchedJobs: "aaaaaaaa"}};
        await searchJobByTitle(req, res);
        expect(res.text.length).toEqual(0)
    });

})