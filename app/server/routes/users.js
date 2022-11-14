const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport

router.route("/register")
.post(users.register);

router.route("/login")
.post(users.login);

router.route("/forgot")
.post(users.forgot);

router.route("/resetPassword")
.post(users.resetPassword);

router.route("/:id/verify/:token")
.get(users.verifiedEmail);

router.route("/:id/reset/:token")
.post(users.verifiedReset);


module.exports = router;
