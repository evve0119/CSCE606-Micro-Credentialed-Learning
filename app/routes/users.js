const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.route("/register")
.get(users.renderRegister)
.post(catchAsync(users.register));

router.route("/login")
.get(users.renderLogin)
// passport.authenticate is an authentication system by passport
.post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login",  keepSessionInfo: true }), users.login); 

router.get("/logout", users.logout);

router.route("/myHomePage/:id")
.get(catchAsync(users.myHomePage))
.post(catchAsync(users.addCredential))



module.exports = router;