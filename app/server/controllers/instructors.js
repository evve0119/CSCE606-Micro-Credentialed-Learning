const User = require("../models").User;
const Course = require("../models").Course;
const Credential = require("../models").Credential;

module.exports.myHomePage = async (req, res) => {
    try {
        const currentInstructor = await User.findById(req.user._id).populate("teach");
        if (!currentInstructor.isInstructor()) {
            return res.status(403).send("You are not an instructor");
        }
        return res.send(currentInstructor);
    } catch (err) {
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

        await Promise.all(addStudentsId.map(async (studentId) => {
            const currentStudent = await User.findById(studentId);

            currentStudent.enroll.push(currentCourse._id);
            await currentStudent.save();
        }));
        return res.send("Successfully add new courses");
    } catch (err) {
        return res.status(400).send("Failed to create");
    }
};

module.exports.renderCourseForm = async (req, res) => {
    try {
        const currentCourse = await Course.findById(req.params.courseId).populate("holder").populate("students");
        if (req.user._id != currentCourse.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentCourse);
    } catch (err) {
        return res.status(400).send("Course does not exist");
    }
};

module.exports.updateCourse = async (req, res) => {
    try {
        const currentCourse = await Course.findById(req.params.courseId);
        if (req.user._id != currentCourse.holder._id.toString()) {
            return res.status(400).send("You are not authorized");
        }
        // New students
        let newStudentsId = []
        req.body.editStudents.map((studentId) => {
            if (!currentCourse.students.includes(studentId)) {
                newStudentsId = [...newStudentsId, studentId]
            }
        })
        // Deleted students
        let deletedStudentsId = []
        currentCourse.students.map((studentId) => {
            if (!req.body.editStudents.includes(studentId)) {
                deletedStudentsId = [...deletedStudentsId, studentId]
            }
        })
        // Update course
        await currentCourse.update({ $set: { name: req.body.courseName, students: req.body.editStudents, description: req.body.courseDescription } });
        await currentCourse.save();
        // Add course to new student
        newStudentsId.map(async (studentId) => {
            const currentStudent = await User.findById(studentId);
            currentStudent.enroll.push(currentCourse._id);
            await currentStudent.save();
        });
        // Delete course to deleted student
        deletedStudentsId.map(async (studentId) => {
            const currentStudent = await User.findById(studentId);
            currentStudent.enroll.pull(currentCourse._id);
            await currentStudent.save();
        });
        return res.send("Successfully update!!!");
    } catch (err) {
        return res.status(400).send("Update failed");
    }
};

module.exports.deleteCourse = async (req, res) => {
    try {
        const currentCourse = await Course.findById(req.params.courseId);
        if (req.user._id != currentCourse.holder._id.toString()) {
            return res.status(400).send("You are not authorized");
        }
        currentCourse.students.map(async (studentId) => {
            const currentStudent = User.findById(studentId);
            await currentStudent.update({ $pull: { enroll: currentCourse._id } });
        })
        const currentInstructor = User.findById(currentCourse.holder._id);
        await currentInstructor.update({ $pull: { teach: currentCourse._id } });
        await Course.findByIdAndDelete(req.params.courseId);
        return res.send("Successfully delete!!!");
    } catch (err) {
        return res.status(404).send("Delete fail!");
    }
};

module.exports.renderSendCredential = async (req, res) => {
    try {
        const currentCourse = await Course.findById(req.params.courseId).populate("students");
        if (req.user._id != currentCourse.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentCourse);
    } catch (err) {
        return res.status(403).send("Course does not exist");
    }
};

module.exports.sendCredential = async (req, res) => {
    try {
        const currentCourse = await Course.findById(req.params.courseId).populate("holder");
        if (req.user._id != currentCourse.holder._id.toString()) {
            return res.status(400).send("You are not authorized");
        }
        await Promise.all(req.body.addStudents.map(async (studentId) => {
            const currentStudent = await User.findById(studentId);
            const currentCredential = new Credential(
                {
                    holder: studentId,
                    instructor: currentCourse.holder,
                    name: currentCourse.name,
                    instructorUsername: currentCourse.holder.username,
                    holderUsername: currentStudent.username,
                    institute: currentCourse.holder.institute,
                    issuedDate: Date.now()
                });
            await currentCredential.save();
            // console.log(typeof(currentCredential.sendDate.toLocaleDateString()));
            // push group to this user
            currentStudent.credentials.push(currentCredential._id);
            await currentStudent.save();
        }));
        return res.send("Credentials have been sent!");
    } catch (err) {
        return res.status(404).send("Course does not exist");
    }
};

module.exports.renderInstituteForm = async (req, res) => {
    try {
        const currentInstructor = await User.findById(req.user._id);
        if (!currentInstructor.isInstructor()) {
            return res.status(403).send("You are not an instructor");
        }
        return res.send(currentInstructor.institute);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get institute!!");
    }

};

module.exports.updateInstitute = async (req, res) => {
    try {
        const currentInstructor = await User.findById(req.user._id);
        if (!currentInstructor.isInstructor()) {
            return res.status(403).send("You are not an instructor");
        }
        await currentInstructor.update({ $set: { institute: req.body.editInstitute } });
        return res.send("Successfully update!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot update institute!!");
    }
};
