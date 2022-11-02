const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Course = require("../../models").Course
const {renderCoursePage} = require("../../controllers/courses");

describe("testing renderCoursePage", function () {
    let instructor
    let course;
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
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
        course = new Course({
            name: "python",
            holder: instructor._id
        });
        await course.save();
        instructor.teach.push(course);
        await instructor.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("get request of a exist course", async() => {
        const req = {params: {id: course._id}};
        await renderCoursePage(req, res);
        expect(res.text._id).toEqual(course._id)
    });

    test("get request of a exist course", async() => {
        const req = {params: {id: "aaaaaaa"}};
        await renderCoursePage(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.text).toEqual("Course does not exist")
    });
})