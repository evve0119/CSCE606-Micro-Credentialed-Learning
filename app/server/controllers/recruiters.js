const User = require("../models").User;
const Job = require("../models").Job;
const Resume = require("../models").Resume;

module.exports.myHomePage = async (req, res) => {
    try{
        const currentRecruiter = await User.findById(req.user._id).populate("jobs");
        if (!currentRecruiter.isRecruiter()) {
            return res.status(403).send("You are not a recruiter");
        }
        return res.send(currentRecruiter);
    } catch(err){
        return res.status(400).send("Error!! Cannot get myHomePage!!");
    }
};


module.exports.createNewJob = async (req, res) => {
    // save new group
    try {
        const currentRecruiter = await User.findById(req.user._id);
        if (!currentRecruiter.isRecruiter()) {
            return res.status(403).send("You are not a recruiter");
        }
        const { jobName, description } = req.body;
        const currentJob = new Job({ name: jobName, holder: req.user._id, description: description });
        await currentJob.save();
        // push group to this user
        currentRecruiter.jobs.push(currentJob._id);
        await currentRecruiter.save();
        /*
        addStudentsId.map(async(studentId) => {
            const currentStudent = await User.findById(studentId);
            currentStudent.enroll.push(currentCourse._id);
            await currentStudent.save();
        });
        */
        return res.send("Successfully add new credential");
        
    } catch (err) {
        return res.status(400).send("Failed to create");
    }
};

module.exports.renderJobForm = async (req, res) => {
    try{
        //const currentJob = await Job.findById(req.params.jobId).populate("holder").populate("students");
        const currentJob = await Job.findById(req.params.jobId).populate("holder").populate("resumes");
        if(req.user._id != currentJob.holder._id.toString()){
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentJob);
    } catch(err){
        return res.status(400).send("Course does not exist");
    }
};

module.exports.updateJob = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.jobId);
        if(req.user._id != currentJob.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }

        /*
        // New students
        let newStudentsId = []
        req.body.editStudents.map((studentId)=>{
            if(!currentCourse.students.includes(studentId)){
                newStudentsId = [...newStudentsId,studentId]
            }
        })
        // Deleted students
        let deletedStudentsId = []
        currentCourse.students.map((studentId)=>{
            if(!req.body.editStudents.includes(studentId)){
                deletedStudentsId = [...deletedStudentsId,studentId]
            }
        })
        */

        // Update course
        //await currentJob.update({ $set: { name: req.body.jobName, students: req.body.editStudents, description: req.body.courseDescription } });
        await currentJob.update({ $set: { name: req.body.jobName, description: req.body.jobDescription } });
        await currentJob.save();

        /*
        // Add course to new student
        newStudentsId.map(async(studentId) => {
            const currentStudent = await User.findById(studentId);
            currentStudent.enroll.push(currentCourse._id);
            await currentStudent.save();
        });
        // Delete course to deleted student
        deletedStudentsId.map(async(studentId) => {
            const currentStudent = await User.findById(studentId);
            currentStudent.enroll.pull(currentCourse._id);
            await currentStudent.save();
        });
        */

        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Update failed");
    }
};

module.exports.deleteJob = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.jobId);
        if(req.user._id != currentJob.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }
        /*
        currentCourse.students.map(async (studentId) => {
            const currentStudent = User.findById(studentId);
            await currentStudent.update({ $pull: { enroll: currentCourse._id } });
        })
        */
        const currentRecruiter = User.findById(currentJob.holder._id);
        await currentRecruiter.update({ $pull: { jobs: currentJob._id } });
        await Job.findByIdAndDelete(req.params.jobId);
        return res.send("Successfully delete!!!");
    } catch(err){
        return res.status(404).send("Delete fail!");
    }
};
/*
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
        await Promise.all(req.body.addStudents.map(async(studentId) =>{
            const currentStudent = await User.findById(studentId);
            const currentCredential = new Credential({ name: currentCourse.name, holder: studentId, instructor: currentCourse.holder });
            await currentCredential.save();
            // push group to this user
            currentStudent.credentials.push(currentCredential._id);
            await currentStudent.save();
        }));
        return res.send("Credentials have been sent!");
    } catch(err){
        return res.status(404).send("Course does not exist");
    }
};
*/

module.exports.renderResume = async (req, res) => {
    try{
        console.log(req.params.resumeId);
        const currentResume = await Resume.findById(req.params.resumeId).populate("credentials");
        return res.send(currentResume);
    } catch(err){
        return res.status(400).send("Resume does not exist");
    }
};