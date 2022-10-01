const User = require("../models/user");
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
    if(req.user._id != req.params.id){
        req.flash("error","This is not your page, you must sign in")
        return res.redirect("/login");
    }
    const currentUser = await User.findById(req.params.id).populate('credentials');
    res.render("users/myHomePage.ejs", {currentUser});
};

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
    const currentUser = await holder.populate('credentials');
    if(req.user._id != req.params.id){
        req.flash("error","This is not your page, you must sign in")
        return res.redirect("/login");
    }
    req.flash("success","Successfully add new credential")
    res.render("users/myHomePage.ejs", {currentUser});
};