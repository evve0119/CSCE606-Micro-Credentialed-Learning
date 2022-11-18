const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Group = require("../../models").Group
const {deleteGroup} = require("../../controllers/students")

describe("testing deleteGroup", function () {
    let student;
    let instructor;
    let group;
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
        });
        await student.save();
        instructor = new User({
            email: "bb@gmail.com",
            username: "bbb",
            password: "bbbbbb",
            role: "instructor",
        });
        await instructor.save();
        group = new Group({name: "programming", holder: student});
        await group.save();
        student.groups.push(group._id);
        group = new Group({name: "dancing", holder: student});
        await group.save()
        student.groups.push(group);
        await student.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("delete group", async() => {
        const req = {user: {_id: student._id},
                     params: {groupId: student.groups[0]}};
        await deleteGroup(req, res);
        expect(res.text).toEqual("Successfully delete!!!");
        const currentStudent = await User.findById(student._id)
        expect(currentStudent.groups.length).toBe(1)
    });
    test("delete by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     params: {groupId: student.groups[1]}};
        await deleteGroup(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("update by wrong ID", async() => {
        const req = {user: {_id: group._id},
                     params: {groupId: student.groups[1]}};
        await deleteGroup(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
})