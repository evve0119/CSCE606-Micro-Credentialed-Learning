const express = require("express");
const router = express.Router();
const instructors = require("../controllers/instructors");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/home/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, instructors.myHomePage)

router.route("/courses/new")
.post(passport.authenticate("jwt", { session: false }), instructors.createNewCourse)

router.route("/courses/:courseId/edit")
.get(passport.authenticate("jwt", { session: false }), instructors.renderCourseForm)
.put(passport.authenticate("jwt", { session: false }), instructors.updateCourse)
.delete(passport.authenticate("jwt", { session: false }), instructors.deleteCourse);

router.route("/intro/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, instructors.renderInstituteForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, instructors.updateInstitute)

router.route("/courses/:courseId/sendCredential")
.get(passport.authenticate("jwt", { session: false }), instructors.renderSendCredential)
.post(passport.authenticate("jwt", { session: false }), instructors.sendCredential)

module.exports = router;