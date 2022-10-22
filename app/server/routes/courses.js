const express = require("express");
const router = express.Router();
const courses = require("../controllers/courses");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/:id")
.get(courses.renderCoursePage);

router.route("/:id/edit")
.get(passport.authenticate("jwt", { session: false }), courses.renderCourseForm)
.put(passport.authenticate("jwt", { session: false }), courses.updateCourse)
.delete(passport.authenticate("jwt", { session: false }), courses.deleteCourse);

router.route("/:id/sendCredential")
.get(passport.authenticate("jwt", { session: false }), courses.renderSendCredential)
.post(passport.authenticate("jwt", { session: false }), courses.sendCredential)

module.exports = router;