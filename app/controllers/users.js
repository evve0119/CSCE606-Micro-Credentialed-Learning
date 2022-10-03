const {User,Group} = require("../models/user");
const Credential = require("../models/credential");

module.exports.renderRegister = async (req, res, next) => {
    res.render("users/register.ejs");
};

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registerdUser = await User.register(user, password);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Register Successfully!!!")
            res.redirect(`/myHomePage/${registerdUser._id}`); 
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res, next) => {
    req.flash("success","Welcome back");
    res.redirect(`/myHomePage/${req.user._id}`);
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/login');
    });
};

module.exports.myHomePage = async (req, res) => {
    const currentUser = await User.findById(req.params.id).populate({
        path: "groups",
        populate: {
            path: "credentials"
        }
    });
    res.render("users/myHomePage.ejs", {currentUser});
};

module.exports.renderNewGroupForm = async (req, res) => {
    const currentUser = await User.findById(req.params.id).populate('credentials');
    res.render("users/newGroup.ejs",{currentUser})
}

module.exports.createNewGroup = async (req, res) => {
    // save new group
    const { groupName, addCredentials } = req.body;
    const currentGroup = new Group({ name: groupName, holder: req.params.id, credentials: addCredentials});
    await currentGroup.save()
    // push group to this user
    const holder = await User.findById(req.params.id);
    holder.groups.push(currentGroup._id);
    await holder.save()
    // redirect to home page
    req.flash("success","Successfully add new credential")
    res.redirect(`/myHomePage/${holder._id}`);
}

module.exports.renderGroupForm = async (req, res) => {
    const currentGroup = await Group.findById(req.params.groupId)
    const currentUser = await User.findById(req.params.id).populate({
        path: "groups",
        populate: {
            path: "credentials"
        }
    }).populate('credentials');
    res.render("users/editGroup.ejs",{currentGroup,currentUser})
}

module.exports.updateGroup = async (req,res) => {
    const currentGroup = await Group.findById(req.params.groupId)
    await currentGroup.update({$set:{credentials:req.body.editCredentials}})
    req.flash("success", "Successfully update!!!")
    res.redirect(res.redirect(`/myHomePage/${req.params.id}`))
}

module.exports.deleteGroup = async (req,res) => {
    const currentUser = await User.findById(req.params.id)
    await currentUser.update({$pull:{groups:req.params.groupId}})
    await Group.findByIdAndDelete(req.params.groupId);
    req.flash("success", "Successfully delete!!!")
    res.redirect(res.redirect(`/myHomePage/${req.params.id}`))
}

module.exports.renderAllCredentials = async (req,res) =>{
    const currentUser = await User.findById(req.params.id).populate('credentials')
    res.render("users/allCredentials.ejs",{currentUser})
}

module.exports.addCredential = async (req, res) => {
    // save new credential
    const { credentialName } = req.body;
    const currentCredential = new Credential({ name:credentialName, holder: req.params.id});
    await currentCredential.save()
    // push credentials to this user
    const holder = await User.findById(req.params.id);
    holder.credentials.push(currentCredential._id);
    await holder.save()
    // search all this user's credentials
    req.flash("success","Successfully add new credential")
    res.redirect(res.redirect(`/allCredentials/${req.params.id}`))
};