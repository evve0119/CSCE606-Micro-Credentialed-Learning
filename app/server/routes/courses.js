const express = require("express");
const router = express.Router();
const courses = require("../controllers/courses");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/:id")
.get(courses.renderCoursePage);

module.exports = router;