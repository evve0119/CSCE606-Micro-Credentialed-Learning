const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Group = require("../../models").Group
const {renderGroupForm} = require("../../controllers/students")

describe("testing renderGroupForm", function () {
    let student;
    let instructor;
    let group;
    const res = {
        text: "",
        statusCode: "",
        status: function(input){this.statusCode = input; return this;},
        send: function(input){this.text = input;}
    };

    beforeAll(async() =>{
        mongoose.connect(mongoURL);
        await mongoose.connection.once('open', ()=>{});
        mongoose.connection.on('error', (error) => console.error('database error', error));
        student = new User({
            email: "aa@gmail.com",
            username: "aaa",
            password: "aaaaaa",
            role: "student",
        });
        await student.save();
        group = new Group({
            name: "python",
            holder: student._id
        });
        await group.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
        student.groups.push(group._id)
        await student.save()
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("get request by student", async() => {
        const req = {user:{_id: student._id},
                     params: {groupId: group._id}};
        await renderGroupForm(req, res);
        expect(res.text.name).toEqual("python")
    });
    test("get request by instructor", async() => {
        const req = {user:{_id: instructor._id},
                     params: {groupId: group._id}};
        await renderGroupForm(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("get request by wonrg user ID", async() => {
        const req = {user:{_id: group._id},
                     params: {groupId: student._id}};
        // const req = {user:{_id: group._id}};
        await renderGroupForm(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Error!! Cannot get GroupForm!!");
    });
})