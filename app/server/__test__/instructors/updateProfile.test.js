const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const { updateProfile } = require("../../controllers/instructors");

describe("testing renderProfileForm", function () {
    let instructor
    let student
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
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
            institute: "Texas A&M University"
        });
        await instructor.save();
        student = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        await student.save();
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("owner change profile", async () => {
        const req = { user: { _id: instructor._id }, body: { editInstitute: "Purdue University" } };
        await updateProfile(req, res);
        const currentInstructor = await User.findById(instructor._id)
        expect(currentInstructor.institute).toEqual(req.body.editInstitute)
    });

    test("other roles render profile form", async () => {
        const req = { user: { _id: student._id } };
        await updateProfile(req, res);
        expect(res.text).toEqual("You are not an instructor")
    });

    test("no login render company form", async () => {
        const req = { user: { _id: "aaaaa" } };
        await updateProfile(req, res);
        expect(res.text).toEqual("Error!! Cannot update profile!!")
    });

})