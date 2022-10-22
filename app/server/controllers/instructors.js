const Instructor = require("../models").User;
const Course = require("../models").Course;

module.exports.myHomePage = async (req, res) => {
    try{
        const currentInstructor = await Instructor.findById(req.user._id).populate("teach");
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
        const currentInstructor = await Instructor.findById(req.user._id);
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
            const currentStudent = await Instructor.findById(studentId);
            currentStudent.enroll.push(currentCourse._id);
            await currentStudent.save();
        });
        return res.send("Successfully add new credential");
    } catch (err) {
        return res.status(400).send("Failed to create");
    }    
};
