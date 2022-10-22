const express = require("express");
const router = express.Router();
const instructors = require("../controllers/instructors");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/myHomePage/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, instructors.myHomePage)
.post(passport.authenticate("jwt", { session: false }), instructors.createNewCourse)

module.exports = router;