const express = require("express");
const router = express.Router();
const jobs = require("../controllers/jobs");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/search")
.post(jobs.searchJobByTitle);

router.route("/:id")
.get(jobs.renderJobPage);

router.route("/")
.get(jobs.renderAllJob);



module.exports = router;