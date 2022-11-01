const Student = require("../models").User;
const Group = require("../models").Group;
const Resume = require("../models").Resume;

module.exports.myHomePage = async (req, res) => {
    try{
        const currentStudent = await Student.findById(req.user._id)
        .populate({
            path: "groups",
            populate: {
                path: "credentials"
            },
        })
        .populate("resumes");
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        return res.send(currentStudent);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get myHomePage!!");
    }
};

module.exports.createNewGroup = async (req, res) => {
    // save new group
    try {
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        const { groupName, addCredentials } = req.body;
        const currentGroup = new Group({ name: groupName, holder: req.params.id, credentials: addCredentials });
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
    try{
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        const currentGroup = await Group.findById(req.params.groupId);
        return res.send(currentGroup);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get GroupForm!!");
    }

};

module.exports.updateGroup = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        const currentGroup = await Group.findById(req.params.groupId)
        await currentGroup.update({ $set: { credentials: req.body.editCredentials, name: req.body.newGroupName } });
        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Error!! Cannot update group!!");
    }

};

module.exports.deleteGroup = async (req, res) => {
    try{
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        await currentStudent.update({ $pull: { groups: req.params.groupId } });
        await Group.findByIdAndDelete(req.params.groupId);
        return res.send("Successfully delete!!!");
    } catch(err){
        return res.status(400).send("Error!! Cannot delete group!!");
    }
};

module.exports.renderAllCredentials = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id).populate('credentials');
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        return res.send(currentStudent.credentials);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get credential!!");
    }
};

module.exports.searchByEmail = async (req, res) => {
    try {
        const currentStudent = await Student.findOne({email:req.body.studentEmail});
        if (!currentStudent.isStudent()){
            return res.status(403).send("This is not a student");
        }
        return res.send(currentStudent);
    } catch (err){
        return res.status(400).send("Student not found!!");
    }
};

module.exports.renderProfileForm = async (req, res) => {
    try{
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        return res.send(currentStudent.profile);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get ProfileForm!!");
    }

};

module.exports.updateProfile = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        await currentStudent.update({ $set: { profile: req.body.editProfile } });
        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Error!! Cannot update profile!!");
    }
};

module.exports.createNewResume = async (req, res) => {
    // save new resume
    try {
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        const { resumeName, addProfile, addCredentials, addCredentialsName } = req.body;
        const currentResume = new Resume({ name: resumeName, profile: addProfile , credentials: addCredentials, credentialsName: addCredentialsName, holder: req.params.id });
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
    try{
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        const currentResume = await Resume.findById(req.params.resumeId);
        return res.send(currentResume);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get resume!!");
    }

};

module.exports.updateResume = async (req, res) => {
    try {
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        const currentResume = await Resume.findById(req.params.resumeId)
        const { resumeName, addProfile, addCredentials, addCredentialsName } = req.body;
        await currentResume.update({ 
            $set: { 
                name: resumeName, 
                profile: addProfile, 
                credentials: addCredentials, 
                credentialsName: addCredentialsName
        }});
        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Error!! Cannot update resume!!");
    }

};

module.exports.deleteResume = async (req, res) => {
    try{
        const currentStudent = await Student.findById(req.user._id);
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        await currentStudent.update({ $pull: { resumes: req.params.resumeId } });
        await Resuem.findByIdAndDelete(req.params.resumeId);
        return res.send("Successfully delete!!!");
    } catch(err){
        return res.status(400).send("Error!! Cannot delete resume!!");
    }
};