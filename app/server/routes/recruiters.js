const express = require("express");
const router = express.Router();
const recruiters = require("../controllers/recruiters");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/home/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, recruiters.myHomePage)

router.route("/jobs/new")
.post(passport.authenticate("jwt", { session: false }), recruiters.createNewJob)

router.route("/jobs/:jobId/edit")
.get(passport.authenticate("jwt", { session: false }), recruiters.renderJobForm)
.put(passport.authenticate("jwt", { session: false }), recruiters.updateJob)
.delete(passport.authenticate("jwt", { session: false }), recruiters.deleteJob);

router.route("/jobs/:jobId/applications")
.get(passport.authenticate("jwt", { session: false }), recruiters.renderJobForm);

router.route("/jobs/:jobId/applications/:resumeId")
.get(recruiters.renderResume);

/*
router.route("/courses/:courseId/sendCredential")
.get(passport.authenticate("jwt", { session: false }), instructors.renderSendCredential)
.post(passport.authenticate("jwt", { session: false }), instructors.sendCredential)
*/

module.exports = router;