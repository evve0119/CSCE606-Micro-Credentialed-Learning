const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Course = require("../../models").Course
const { updateCourse } = require("../../controllers/instructors")

describe("testing updateCourse", function () {
    let student1;
    let instructor;
    let course;
    let student2;
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
        student2 = new User({
            email: "cc@gmail.com",
            username: "ccc",
            password: "cccccc",
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
            description: "cool",
            holder: instructor._id,
            students: [student1._id]
        });
        await course.save();
        instructor.teach.push(course);
        await instructor.save();
        student1.enroll.push(course);
        await student1.save();
        await student2.save();
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("User change course name and description", async () => {
        const req = {
            user: { _id: instructor._id },
            params: { courseId: course._id },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [] }
        };
        await updateCourse(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentCourse = await Course.findById(course._id);
        expect(currentCourse.description).toEqual("Best course ever!");
        expect(currentCourse.name).toEqual("javascript");
    });

    test("someone not user change", async () => {
        const req = {
            user: { _id: "hehehehe" },
            params: { courseId: course._id },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [] }
        };
        await updateCourse(req, res);
        expect(res.text).toEqual("You are not authorized");
    });

    test("User delete student from course", async () => {
        const req = {
            user: { _id: instructor._id },
            params: { courseId: course._id },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [] }
        };
        await updateCourse(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentCourse = await Course.findById(course._id);
        const currentStudent = await User.findById(student1._id);
        expect(currentStudent.enroll).toEqual([]);
        expect(currentCourse.students).toEqual([]);
    });

    test("User add student to course", async () => {
        const req = {
            user: { _id: instructor._id },
            params: { courseId: course._id },
            body: { courseName: "javascript", description: "Best course ever!", addStudentsId: [student1._id,student2._id] }
        };
        await updateCourse(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentCourse = await Course.findById(course._id);
        const currentStudent = await User.findById(student2._id);
        expect(currentStudent.enroll).toEqual([course._id]);
        expect(currentCourse.students).toEqual([student1._id,student2._id]);
    });

})