const Student = require("../models").User;
const Group = require("../models").Group;
const Resume = require("../models").Resume;
const Job = require("../models").Job;
const profileValidation = require("../validation").profileValidation;
const groupValidation = require("../validation").groupValidation;
const resumeValidation = require("../validation").resumeValidation;
const emailValidation = require("../validation").emailValidation;

module.exports.myHomePage = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id)
            .populate({
                path: "groups",
                populate: {
                    path: "credentials"
                },
            })
            .populate("resumes")
            .populate("credentials");
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentStudent);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get myHomePage!!");
    }
};

module.exports.createNewGroup = async (req, res) => {
    // save new group
    try {
        const { error } = groupValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not authorized");
        }
        const { groupName, addCredentials } = req.body;
        const currentGroup = new Group({ name: groupName, holder: req.user._id, credentials: addCredentials });
        await currentGroup.save();
        // push group to this user
        currentStudent.groups.push(currentGroup._id);
        await currentStudent.save();
        // redirect to home page
        return res.send("Successfully add new credential");
    } catch (err) {
        return res.status(400).send("Failed to create");
    }
};

module.exports.renderGroupForm = async (req, res) => {
    try {
        const currentGroup = await Group.findById(req.params.groupId).populate("credentials");
        if (req.user._id != currentGroup.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentGroup);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get GroupForm!!");
    }

};

module.exports.updateGroup = async (req, res) => {
    try {
        const { error } = groupValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const currentGroup = await Group.findById(req.params.groupId)
        if (req.user._id != currentGroup.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        currentGroup.credentials = req.body.addCredentials;
        currentGroup.name = req.body.groupName;
        await currentGroup.save();
        return res.send("Successfully update!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot update group!!");
    }

};

module.exports.deleteGroup = async (req, res) => {
    try {
        const currentGroup = await Group.findById(req.params.groupId);
        if (req.user._id != currentGroup.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        const currentStudent = await Student.findById(req.user._id);
        await currentStudent.update({ $pull: { groups: req.params.groupId } });
        await Group.findByIdAndDelete(req.params.groupId);
        return res.send("Successfully delete!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot delete group!!");
    }
};

module.exports.renderAllCredentials = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id).populate({
            path: "credentials",
            populate: [{ path: "holder" }, { path: "instructor" }]
        });
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentStudent.credentials);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get credential!!");
    }
};

module.exports.searchByEmail = async (req, res) => {
    try {
        const { error } = emailValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const currentStudent = await Student.findOne({ email: req.body.studentEmail });
        if (!currentStudent.isStudent()) {
            return res.status(403).send("This is not a student");
        }
        return res.send(currentStudent);
    } catch (err) {
        return res.status(400).send("Student not found!!");
    }
};

module.exports.renderProfileForm = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentStudent.profile);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get ProfileForm!!");
    }

};

module.exports.updateProfile = async (req, res) => {
    try {
        const { error } = profileValidation(req.body.editProfile);
        if (error) return res.status(400).send(error.details[0].message);
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not authorized");
        }
        await currentStudent.update({ $set: { profile: req.body.editProfile } });
        return res.send("Successfully update!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot update profile!!");
    }
};

module.exports.createNewResume = async (req, res) => {
    // save new resume
    try {
        const { error } = resumeValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not authorized");
        }
        const { resumeName, addProfile, addCredentials } = req.body;
        const currentResume = new Resume({ name: resumeName, profile: addProfile, credentials: addCredentials, holder: req.user._id });
        await currentResume.save();
        // push group to this user
        currentStudent.resumes.push(currentResume._id);
        await currentStudent.save();
        // redirect to home page
        return res.send("Successfully create new resume");
    } catch (err) {
        return res.status(400).send("Failed to create");
    }
};

module.exports.renderResumeForm = async (req, res) => {
    try {
        const currentResume = await Resume.findById(req.params.resumeId).populate({
            path: "credentials",
            populate: [{ path: "holder" }, { path: "instructor" }]
        });
        return res.send(currentResume);
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error!! Cannot get resume!!");
    }

};

module.exports.updateResume = async (req, res) => {
    try {
        const { error } = resumeValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const currentResume = await Resume.findById(req.params.resumeId)
        if (req.user._id != currentResume.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        const { resumeName, addProfile, addCredentials } = req.body;
        await currentResume.update({
            $set: {
                name: resumeName,
                profile: addProfile,
                credentials: addCredentials
            }
        });
        return res.send("Successfully update!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot update resume!!");
    }

};

module.exports.deleteResume = async (req, res) => {
    try {
        const currentResume = await Resume.findById(req.params.resumeId);
        if (req.user._id != currentResume.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        const currentStudent = await Student.findById(req.user._id);
        await currentStudent.update({ $pull: { resumes: req.params.resumeId } });
        await Resume.findByIdAndDelete(req.params.resumeId);
        return res.send("Successfully delete!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot delete resume!!");
    }
};

module.exports.submitResume = async (req, res) => {
    try {
        const { resumeId, jobId } = req.body;
        const currentResume = await Resume.findById(resumeId);
        if (req.user._id != currentResume.holder._id.toString()) {
            return res.status(403).send("You are not authorized");
        }
        const currentJob = await Job.findById(jobId);
        currentJob.resumes.push(resumeId);
        await currentJob.save();
        return res.send("Successfully submit!!!");
    } catch (err) {
        return res.status(400).send("Error!! Cannot submit resume!!");
    }
};