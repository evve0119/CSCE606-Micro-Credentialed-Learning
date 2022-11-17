const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Course = require("../../models").Course
const { createNewCourse } = require("../../controllers/instructors")

describe("testing createNewCourse", function () {
    let student1;
    let instructor;
    let student2;
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
        student1 = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        student2 = new User({
            email: "cc@gmail.com",
            username: "ccc",
            password: "cccccc",
            role: "student",
        });
        await student1.save();
        await student2.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("Other role create new course", async () => {
        const req = {
            user: { _id: student1._id },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [student1._id, student2._id] }
        };
        await createNewCourse(req, res);
        expect(res.text).toEqual("You are not an instructor");
        const currentCourse = await Course.findOne({});
        expect(currentCourse).toEqual(null);
    });

    test("No login create new course", async () => {
        const req = {
            user: { _id: "" },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [student1._id, student2._id] }
        };
        await createNewCourse(req, res);
        expect(res.text).toEqual("Failed to create");
        const currentCourse = await Course.findOne({});
        expect(currentCourse).toEqual(null);
    });

    test("Instructor create new course", async () => {
        const req = {
            user: { _id: instructor._id },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [student1._id, student2._id] }
        };
        await createNewCourse(req, res);
        expect(res.text).toEqual("Successfully add new courses");
        const currentCourse = await Course.findOne({});
        expect(currentCourse.description).toEqual("Best course ever!");
        expect(currentCourse.name).toEqual("javascript");
    });

})