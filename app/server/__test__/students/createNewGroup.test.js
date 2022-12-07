const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/csce606"
const User = require("../../models").User
const Credential = require("../../models").Credential
const Group = require("../../models").Group
const {createNewGroup} = require("../../controllers/students")

describe("testing createNewGroup", function () {
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
        let credential = new Credential({name: "python"});
        await credential.save();
        student.credentials.push(credential._id);
        credential = new Credential({name: "Java"});
        await credential.save();
        student.credentials.push(credential._id);
        credential = new Credential({name: "Dancing"});
        await credential.save();
        student.credentials.push(credential._id);
        await student.save();

        group = new Group({});
        await group.save();
    });
    afterAll(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close()
    });

    test("create new group", async() => {
        const req = {user: {_id: student._id},
                     params: {id: student._id},
                     body: {groupName: "programming",
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await createNewGroup(req, res);
        expect(res.text).toEqual("Successfully add new credential");
        const currentStudent = await User.findById(student._id)
        const newGroup = await Group.findById(currentStudent.groups[0])
        expect(newGroup.credentials.length).toBe(2)
    });
    test("create new group by instructor", async() => {
        const req = {user: {_id: instructor._id},
                     params: {id: instructor._id},
                     body: {groupName: "programming",
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await createNewGroup(req, res);
        expect(res.statusCode).toBe(403);
        expect(res.text).toEqual("You are not authorized");
    });
    test("create new group by wrong ID", async() => {
        const req = {user: {_id: group._id},
                     params: {id: group._id},
                     body: {groupName: "programming",
                            addCredentials: [student.credentials[0], student.credentials[1]]}};
        await createNewGroup(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual("Failed to create");
    });
})