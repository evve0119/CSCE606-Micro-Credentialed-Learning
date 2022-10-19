const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
// const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
// const {isAuthor} = require("../middleware");

router.route("/register")
.get(users.renderRegister)
.post(users.register);

router.route("/login")
.get(users.renderLogin)
.post(users.login);

router.get("/logout", users.logout);

// router.route("/myHomePage/:id")
// .get(passport.authenticate("jwt", { session: false }), isAuthor, users.myHomePage)
// .post(passport.authenticate("jwt", { session: false }), users.createNewGroup)

// groups route
// router.route("/myHomePage/:id/newGroup")
// .get(passport.authenticate("jwt", { session: false }), isAuthor, users.renderNewGroupForm)

// router.route("/myHomePage/:id/:groupId")
// .get(passport.authenticate("jwt", { session: false }), isAuthor, users.renderGroupForm)
// .put(passport.authenticate("jwt", { session: false }), isAuthor, users.updateGroup)
// .delete(passport.authenticate("jwt", { session: false }), isAuthor, users.deleteGroup)

// all credentials route
// router.route("/allCredentials/:id")
// .get(passport.authenticate("jwt", { session: false }), isAuthor, users.renderAllCredentials)
// .post(passport.authenticate("jwt", { session: false }), isAuthor, users.addCredential)


module.exports = router;
