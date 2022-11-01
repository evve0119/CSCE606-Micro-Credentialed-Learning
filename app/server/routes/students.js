const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/myHomePage/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.myHomePage)
.post(passport.authenticate("jwt", { session: false }), students.createNewGroup)

router.route("/myHomePage/:id/:groupId")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderGroupForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateGroup)
.delete(passport.authenticate("jwt", { session: false }), isAuthor, students.deleteGroup)

router.route("/allCredentials/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderAllCredentials)

router.route("/search")
.post( passport.authenticate("jwt", { session: false }),students.searchByEmail)

router.route("/profile/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderProfileForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateProfile)

router.route("/resume/new/:id")
.post(passport.authenticate("jwt", { session: false }), students.createNewResume)

router.route("/resume/:id/:resumeId")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderResumeForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateResume)
.delete(passport.authenticate("jwt", { session: false }), isAuthor, students.deleteResume)

module.exports = router;
