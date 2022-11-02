const User = require("../models").User;
const Course = require("../models").Course;
const Credential = require("../models").Credential;

module.exports.myHomePage = async (req, res) => {
    try{
        const currentInstructor = await User.findById(req.user._id).populate("teach");
        if (!currentInstructor.isInstructor()) {
            return res.status(403).send("You are not an instructor");
        }
        return res.send(currentInstructor);
    } catch(err){
        return res.status(400).send("Error!! Cannot get myHomePage!!");
    }
};

module.exports.createNewCourse = async (req, res) => {
    // save new group
    try {
        const currentInstructor = await User.findById(req.user._id);
        if (!currentInstructor.isInstructor()) {
            return res.status(403).send("You are not an instructor");
        }
        const { courseName, description, addStudentsId } = req.body;
        const currentCourse = new Course({ name: courseName, holder: req.user._id, students: addStudentsId, description: description });
        await currentCourse.save();
        // push group to this user
        currentInstructor.teach.push(currentCourse._id);
        await currentInstructor.save();
        addStudentsId.map(async(studentId) => {
            const currentStudent = await User.findById(studentId);
            currentStudent.enroll.push(currentCourse._id);
            await currentStudent.save();
        });
        return res.send("Successfully add new credential");
    } catch (err) {
        return res.status(400).send("Failed to create");
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
        const currentCourse = await Course.findById(req.params.id).populate("holder");
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
        const currentCourse = await Course.findById(req.params.courseId).populate("students");
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
        const currentCourse = await Course.findById(req.params.courseId);
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
