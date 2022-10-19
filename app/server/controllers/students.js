const Student = require("../models").User;
const Credential = require("../models").Credential;
const Group = require("../models").Group;

module.exports.myHomePage = async (req, res) => {
    
    const currentStudent = await Student.findById(req.user._id).populate({
        path: "groups",
        populate: {
            path: "credentials"
        }
    });
    if (!currentStudent.isStudent()) {
        return res.status(403).send("You are not a student");
    }
    res.send(currentStudent)

    // res.render("users/myHomePage.ejs", {currentUser});
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
        await currentGroup.save()
        // push group to this user
        currentStudent.groups.push(currentGroup._id);
        await currentStudent.save()
    } catch (err) {
        res.status(400).send("Failed to create");
    }
    // redirect to home page
    res.send("Successfully add new credential")
};

module.exports.renderGroupForm = async (req, res) => {
    const currentStudent = await Student.findById(req.user._id);
    if (!currentStudent.isStudent()) {
        return res.status(403).send("You are not a student");
    }
    const currentGroup = await Group.findById(req.params.groupId)
    // const currentUser = await User.findById(req.params.id).populate({
    //     path: "groups",
    //     populate: {
    //         path: "credentials"
    //     }
    // }).populate('credentials');
    res.send(currentGroup)
    // res.render("users/editGroup.ejs",{currentGroup,currentUser})
};

module.exports.updateGroup = async (req, res) => {
    const currentStudent = await Student.findById(req.user._id);
    if (!currentStudent.isStudent()) {
        return res.status(403).send("You are not a student");
    }
    const currentGroup = await Group.findById(req.params.groupId)
    await currentGroup.update({ $set: { credentials: req.body.editCredentials, name: req.body.newGroupName } })
    res.send("Successfully update!!!")
    // res.redirect(res.redirect(`/myHomePage/${req.params.id}`))
}

module.exports.deleteGroup = async (req, res) => {
    const currentStudent = await Student.findById(req.user._id);
    if (!currentStudent.isStudent()) {
        return res.status(403).send("You are not a student");
    }
    await currentStudent.update({ $pull: { groups: req.params.groupId } })
    await Group.findByIdAndDelete(req.params.groupId);
    res.send("Successfully delete!!!")
}

module.exports.renderAllCredentials = async (req, res) => {

    try {
        const currentStudent = await Student.findById(req.user._id).populate('credentials')
        if (!currentStudent.isStudent()) {
            return res.status(403).send("You are not a student");
        }
        res.send(currentStudent.credentials)
    } catch (err) {
        res.status(500).send("Error!! Cannot get credential!!");
    }
    // res.render("users/allCredentials.ejs",{currentUser})
}

// module.exports.addCredential = async (req, res) => {
//     // save new credential
//     const currentStudent = await Student.findById(req.user._id);
//     if (!currentStudent.isStudent()) {
//         return res.status(403).send("You are not a student");
//     }
//     const { credentialName } = req.body;
//     const currentCredential = new Credential({ name: credentialName, holder: req.params.id });
//     try {
//         await currentCredential.save()
//     } catch (err) {
//         res.status(400).send("Cannot save credential.");
//     }
//     // push credentials to this user
//     currentStudent.credentials.push(currentCredential._id);
//     try {
//         await currentStudent.save()
//         res.status(200).send("New credential has been saved.");
//     } catch (err) {
//         res.status(400).send("Cannot save credential.");
//     }
//     // search all this user's credentials
//     // res.redirect(res.redirect(`/allCredentials/${req.params.id}`))
// };

module.exports.searchByEmail = async (req, res) => {
    try {
        const currentStudent = await Student.findOne({email:req.body.studentEmail})
        if (!currentStudent.isStudent()){
            res.status(400).send("This is not a student")
        }
        res.send(currentStudent)
    } catch (err){
        res.status(400).send("Student not found!!")
    }
}
