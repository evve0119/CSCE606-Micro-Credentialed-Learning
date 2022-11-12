const express = require("express");
const router = express.Router();
const jobs = require("../controllers/jobs");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/:id")
.get(jobs.renderJobPage);

module.exports = router;