const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/home")
.get(passport.authenticate("jwt", { session: false }), students.myHomePage)

router.route("/groups/new")
.post(passport.authenticate("jwt", { session: false }), students.createNewGroup)

router.route("/groups/:groupId")
.get(passport.authenticate("jwt", { session: false }), students.renderGroupForm)
.put(passport.authenticate("jwt", { session: false }), students.updateGroup)
.delete(passport.authenticate("jwt", { session: false }), students.deleteGroup)

router.route("/credentials")
.get(passport.authenticate("jwt", { session: false }), students.renderAllCredentials)

router.route("/search")
.post( passport.authenticate("jwt", { session: false }),students.searchByEmail)

router.route("/intro")
.get(passport.authenticate("jwt", { session: false }), students.renderProfileForm)
.put(passport.authenticate("jwt", { session: false }), students.updateProfile)

router.route("/resumes/new")
.post(passport.authenticate("jwt", { session: false }), students.createNewResume)

router.route("/resumes/:resumeId")
.get(passport.authenticate("jwt", { session: false }), students.renderResumeForm)
.put(passport.authenticate("jwt", { session: false }), students.updateResume)
.delete(passport.authenticate("jwt", { session: false }), students.deleteResume)

router.route("/application")
.post(passport.authenticate("jwt", { session: false }), students.submitResume);

module.exports = router;
