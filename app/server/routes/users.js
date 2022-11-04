const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/register")
.post(users.register);

router.route("/login")
.post(users.login);

router.route("/:id/verify/:token")
.get(users.verifiedEmail);

module.exports = router;
