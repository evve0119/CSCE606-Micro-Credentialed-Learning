const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Course = require("../../models").Course
const { deleteCourse } = require("../../controllers/instructors")

describe("testing deleteCourse", function () {
    let student1;
    let instructor;
    let course;
    const res = {
        text: "",
        statusCode: "",
        status: function (input) { this.statusCode = input; return this; },
        send: function (input) { this.text = input; }
    }
    beforeAll(async () => {
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', () => { });
        mongoose.connection.on('error', (error) => console.error('database error', error));
        student1 = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        await student1.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
        course = new Course({
            name: "python",
            description: "",
            holder: instructor._id,
            students: [student1._id]
        });
        await course.save();
        instructor.teach.push(course);
        await instructor.save();
        student1.enroll.push(course);
        await student1.save();
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("Someone not user delete", async () => {
        const req = {
            user: { _id: student1._id },
            params: { courseId: course._id },
        };
        await deleteCourse(req, res);
        expect(res.text).toEqual("You are not authorized");
    });

    test("User delete", async () => {
        const req = {
            user: { _id: instructor._id },
            params: { courseId: course._id },
        };
        await deleteCourse(req, res);
        expect(res.text).toEqual("Successfully delete!!!");
        const currentCourse = await Course.findById(course._id);
        const currentInstructor = await User.findById(instructor._id);
        const currentStudent = await User.findById(student1._id);
        expect(currentCourse).toEqual(null);
        expect(currentInstructor.teach).toEqual([]);
        expect(currentStudent.enroll).toEqual([]);
    });

    

})