const Student = require("../models").User;
const Group = require("../models").Group;

module.exports.myHomePage = async (req, res) => {
    try{
        const currentStudent = await Student.findById(req.user._id).populate({
            path: "groups",
            populate: {
                path: "credentials"
            }
        });
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
