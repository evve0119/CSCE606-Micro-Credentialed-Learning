const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Credential = require("../../models").Credential
const Group = require("../../models").Group
const {updateGroup} = require("../../controllers/students")

describe("testing updateGroup", function () {
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
        group = new Group({name: "programming", holder: student._id});
        await group.save();

        let credential = new Credential({name: "python"});
        await credential.save();
        group.credentials.push(credential._id);
        student.credentials.push(credential._id);

        credential = new Credential({name: "Java"});
        await credential.save();
        group.credentials.push(credential._id);
        student.credentials.push(credential._id);

        credential = new Credential({name: "Dancing"});
        await credential.save();
        await group.save();
        student.groups.push(group._id);
        student.credentials.push(credential._id);
        await student.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("update group name", async() => {
        const req = {user: {_id: student._id},
                     params: {groupId: student.groups[0]},
                     body: {groupName: "Software",
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await updateGroup(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newGroup = await Group.findById(currentStudent.groups[0])
        expect(newGroup.name).toEqual("Software")
    });

    test("add credentials to group", async() => {
        const req = {user: {_id: student._id},
                     params: {groupId: student.groups[0]},
                     body: {groupName: "Software",
                            addCredentials: [student.credentials[0], student.credentials[1], student.credentials[2]]}};
        await updateGroup(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newGroup = await Group.findById(currentStudent.groups[0])
        expect(newGroup.credentials.length).toBe(3)
    });

    test("delete credentials from group", async() => {
        const req = {user: {_id: student._id},
                     params: {groupId: student.groups[0]},
                     body: {groupName: "Software",
                            addCredentials: [student.credentials[0]]}};
        await updateGroup(req, res);
        expect(res.text).toEqual("Successfully update!!!");
        const currentStudent = await User.findById(student._id)
        const newGroup = await Group.findById(currentStudent.groups[0])
        expect(newGroup.credentials.length).toBe(1)
    });
    test("update by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     params: {groupId: student.groups[0]},
                     body: {groupName: "Software",
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await updateGroup(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("update without user ID", async() => {
        const req = {user: {_id: ""},
                     params: {groupId: student.groups[0]},
                     body: {groupName: "Software",
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await updateGroup(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
})