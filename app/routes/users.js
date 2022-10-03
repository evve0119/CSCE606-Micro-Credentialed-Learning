const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const {isLoggedIn,isAuthor} = require("../middleware");

router.route("/register")
.get(users.renderRegister)
.post(catchAsync(users.register));

router.route("/login")
.get(users.renderLogin)
.post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login",  keepSessionInfo: true }), users.login); // passport.authenticate is an authentication system by passport

router.get("/logout", users.logout);

router.route("/myHomePage/:id")
.get(isLoggedIn, isAuthor, catchAsync(users.myHomePage))
.post(catchAsync(users.createNewGroup)) 

// groups route
router.route("/myHomePage/:id/newGroup")
.get(isLoggedIn, isAuthor, catchAsync(users.renderNewGroupForm))

router.route("/myHomePage/:id/:groupId")
.get(isLoggedIn, isAuthor, catchAsync(users.renderGroupForm)) 
.put(isLoggedIn, isAuthor, catchAsync(users.updateGroup))
.delete(isLoggedIn, isAuthor, catchAsync(users.deleteGroup))



// all credentials route
router.route("/allCredentials/:id")
.get(isLoggedIn, isAuthor, catchAsync(users.renderAllCredentials))
.post(isLoggedIn, isAuthor, catchAsync(users.addCredential))


module.exports = router;