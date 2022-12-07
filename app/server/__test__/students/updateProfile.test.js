const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const {updateProfile} = require("../../controllers/students")

describe("testing updateProfile", function () {
    let student;
    let instructor;
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
            profile:{firstName: "Ken", phone: "0123456789" }
        });
        await student.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("update first name", async() => {
        const req = {user: {_id: student._id},
                     body: {editProfile: {firstName: "Justin", phone:"0123456789"}
                    }};
        await updateProfile(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id);
        expect(currentStudent.profile.firstName).toEqual("Justin");
        expect(currentStudent.profile.lastName).toEqual("");
        expect(currentStudent.profile.phone).toEqual("0123456789");
    });

    test("add last name", async() => {
        const req = {user: {_id: student._id},
                     body: {editProfile: {firstName: "Justin", lastName: "Student", phone:"0123456789"}
                    }};
        await updateProfile(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id);
        expect(currentStudent.profile.firstName).toEqual("Justin");
        expect(currentStudent.profile.lastName).toEqual("Student");
        expect(currentStudent.profile.phone).toEqual("0123456789");
    });

    test("delete phone", async() => {
        const req = {user: {_id: student._id},
                     body: {editProfile: {firstName: "Justin", lastName: "Student", phone:""}
                    }};
        await updateProfile(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id);
        expect(currentStudent.profile.firstName).toEqual("Justin");
        expect(currentStudent.profile.lastName).toEqual("Student");
        expect(currentStudent.profile.phone).toEqual("");
    });
    test("update by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     body: {editProfile: {firstName: "Justin", lastName: "Student", phone:"0123456789"}
                    }};
        await updateProfile(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("update without login", async() => {
        const req = {user: {_id: ""},
                     body: {editProfile: {firstName: "Justin", lastName: "Student", phone:"0123456789"}
                    }};
        await updateProfile(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot update profile!!");
    });
})