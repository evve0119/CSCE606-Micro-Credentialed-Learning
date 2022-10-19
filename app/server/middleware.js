// module.exports.isLoggedIn = (req,res,next) => {
//     if (!req.isAuthenticated()) {
//         req.session.returnTo = req.originalUrl;
//         req.flash("error", "Login first");
//         return res.redirect("/login");
//     }
//     next();
// };

module.exports.isAuthor = async(req,res,next) => {
    if(req.params.id != req.user._id){
        return res.status(403).send("???");
    }
    next()
};
