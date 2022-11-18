const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const Resume = require("../../models").Resume
const {renderResume} = require("../../controllers/recruiters")


describe("testing updateJob", function () {
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
        resume = new Resume({
            name: "First resume",
            profile: {
                firstName: "uuuuuuu",
                lastName: "aaadddd",
                phone: "123412341234",
                email: "aa@gmail.com",
                address: "Texas",
                description: "aaaasdf",
            }
        });
        await resume.save();

    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("resume not exist", async () => {
        const req = { resumeId: { _id: "aaaaa" } };
        await renderResume(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Resume does not exist")
    });


    test("no login render company form", async () => {
        const req = { params: {resumeId: resume._id}};
        await renderResume(req, res);
        expect(res.text.name).toEqual("First resume")
    });




})
