const express = require("express");
const router = express.Router();
const instructors = require("../controllers/instructors");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/home")
.get(passport.authenticate("jwt", { session: false }), instructors.myHomePage)

router.route("/courses/new")
.post(passport.authenticate("jwt", { session: false }), instructors.createNewCourse)

router.route("/courses/:courseId/edit")
.get(passport.authenticate("jwt", { session: false }), instructors.renderCourseForm)
.put(passport.authenticate("jwt", { session: false }), instructors.updateCourse)
.delete(passport.authenticate("jwt", { session: false }), instructors.deleteCourse);

router.route("/intro")
.get(passport.authenticate("jwt", { session: false }), instructors.renderInstituteForm)
.put(passport.authenticate("jwt", { session: false }), instructors.updateInstitute)

router.route("/courses/:courseId/sendCredential")
.get(passport.authenticate("jwt", { session: false }), instructors.renderSendCredential)
.post(passport.authenticate("jwt", { session: false }), instructors.sendCredential)

module.exports = router;