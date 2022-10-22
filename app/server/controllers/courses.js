const User = require("../models").User;
const Course = require("../models").Course;
const Credential = require("../models").Credential;

module.exports.renderCoursePage = async (req, res) => {
    try{
        console.log(req.params.id);
        const currentCourse = await Course.findById(req.params.id).populate("holder");
        return res.send(currentCourse);
    } catch(err){
        return res.status(404).send("Course does not exist");
    }
};

module.exports.renderCourseForm = async (req, res) => {
    try{
        const currentCourse = await Course.findById(req.params.id).populate("holder");
        if(req.user._id != currentCourse.holder._id.toString()){
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentCourse);
    } catch(err){
        return res.status(400).send("Course does not exist");
    }
};

module.exports.updateCourse = async (req, res) => {
    try{
        const currentCourse = await Course.findById(req.params.id).populate("holder");
        if(req.user._id != currentCourse.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }
        // res.send(currentCourse);
        await currentCourse.update({ $set: { name: req.body.courseName, students: req.body.addStudents, description: req.body.description } });
        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Update failed");
    }
};

module.exports.deleteCourse = async (req, res) => {
    try{
        const currentCourse = await Student.findById(req.params.id).populate("holder");
        if(req.user._id != currentCourse.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }
        // res.send(currentCourse);
        currentCourse.students.map(async (studentId) => {
            const currentStudent = User.findById(studentId);
            await currentStudent.update({ $pull: { enroll: req.params.id } });
        })
        const currentInstructor = User.findById(currentCourse.holder._id);
        await currentInstructor.update({ $pull: { teach: req.params.id } });

        await Course.findByIdAndDelete(req.params.id);
        return res.send("Successfully delete!!!");
    } catch(err){
        return res.status(404).send("Course does not exist");
    }
};

module.exports.renderSendCredential = async (req, res) => {
    try{
        const currentCourse = await Course.findById(req.params.id).populate("students");
        if(req.user._id != currentCourse.holder._id.toString()){
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentCourse);
    } catch(err){
        return res.status(403).send("Course does not exist");
    }
};

module.exports.sendCredential = async (req, res) => {
    try{
        const currentCourse = await Course.findById(req.params.id);
        if(req.user._id != currentCourse.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }
        req.body.addStudents.map(async(studentId) =>{
            const currentStudent = await User.findById(studentId);
            const currentCredential = new Credential({ name: currentCourse.name, holder: studentId, instructor: currentCourse.holder });
            await currentCredential.save()
            // push group to this user
            currentStudent.credentials.push(currentCredential._id);
            await currentStudent.save()
        });
        return res.send("Credentials have been sent!");
    } catch(err){
        return res.status(404).send("Course does not exist");
    }
};