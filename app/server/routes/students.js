const express = require("express");
const router = express.Router();
const students = require("../controllers/students");

const passport = require("passport");
require("../config/passport")(passport); // Validate user by passport
const {isAuthor} = require("../middleware");

router.route("/myHomePage/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.myHomePage)
.post(passport.authenticate("jwt", { session: false }), students.createNewGroup)

// groups route
// router.route("/myHomePage/:id/newGroup")
// .get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderNewGroupForm)

router.route("/myHomePage/:id/:groupId")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderGroupForm)
.put(passport.authenticate("jwt", { session: false }), isAuthor, students.updateGroup)
.delete(passport.authenticate("jwt", { session: false }), isAuthor, students.deleteGroup)

// all credentials route
router.route("/allCredentials/:id")
.get(passport.authenticate("jwt", { session: false }), isAuthor, students.renderAllCredentials)
// .post(passport.authenticate("jwt", { session: false }), isAuthor, students.addCredential)

router.route("/search")
.post( passport.authenticate("jwt", { session: false }),students.searchByEmail)

module.exports = router;

