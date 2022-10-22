const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/myHomePage/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.myHomePage)
.post(passport.authenticate("jwt", { session: false }), students.createNewGroup)

router.route("/myHomePage/:id/:groupId")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderGroupForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateGroup)
.delete(passport.authenticate("jwt", { session: false }), isAuthor, students.deleteGroup)

router.route("/allCredentials/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderAllCredentials)

router.route("/search")
.post( passport.authenticate("jwt", { session: false }),students.searchByEmail)

module.exports = router;
