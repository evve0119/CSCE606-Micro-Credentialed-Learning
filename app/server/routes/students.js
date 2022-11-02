const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/home/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.myHomePage)

router.route("/groups/new/:id")
.post(passport.authenticate("jwt", { session: false }), students.createNewGroup)

router.route("/groups/:id/:groupId")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderGroupForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateGroup)
.delete(passport.authenticate("jwt", { session: false }), isAuthor, students.deleteGroup)

router.route("/credentials/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderAllCredentials)

router.route("/search")
.post( passport.authenticate("jwt", { session: false }),students.searchByEmail)

router.route("/intro/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderProfileForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateProfile)

router.route("/resumes/new/:id")
.post(passport.authenticate("jwt", { session: false }), students.createNewResume)

router.route("/resumes/:id/:resumeId")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderResumeForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateResume)
.delete(passport.authenticate("jwt", { session: false }), isAuthor, students.deleteResume)

module.exports = router;
