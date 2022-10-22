const User = require("../models").User;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken")

module.exports.register = async (req, res) => {
  // check the validation of data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Email has already been registered.");

  // register the user
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const savedUser = await newUser.save();
    return res.status(200).send("success");
  } catch (err) {
    return res.status(400).send("User not saved.");
  }
}

module.exports.login = (req, res) => {
  // check the validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.status(400).send(err);
    }
    if (!user) {
      return res.status(400).send("User not found.");
    } else {
      if (user.role != req.body.role) {
        return res.status(400).send(`You are not a ${req.body.role}`);
      }
      user.comparePassword(req.body.password, function (err, isMatch) {

        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          res.status(400).send("Wrong password.");
        }
      });
    }
  });
};