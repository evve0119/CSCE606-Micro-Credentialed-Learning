const User = require("../models").User;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Read dotenv file
};

module.exports.verifiedEmail = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});

    if (!user) return res.status(400).send({message: "Invalid link"});

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({message: "Invalid link"});
    console.log(user.verified);
    await User.updateOne({_id: user._id},{verified: true});
    await token.remove();

    res.status(200).send({message: "Email verified successfully"})

  } catch(error){
    return res.status(500).send({message:"Internal Server Error"});
  }

}

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
    verified: false,
  });

  try {
    const savedUser = await newUser.save();
    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex")
    }).save();
    const url = `${process.env.BASE_URL}user/${savedUser._id}/verify/${token.token}`;
    await sendEmail(savedUser.email, url);
    return res.status(201).send("An Email sent to your account, please verify");
  } catch (err) {
    return res.status(400).send("User not saved.");
  }
}

module.exports.login = async (req, res) => {
  // check the validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try{
    const user = await User.findOne({ email: req.body.email });
    if (!user){
      return res.status(400).send("The user doesn't exit.");
    } else {
      if(!user.verified) {
        res.status(400).send("Email is not verified. A new verification email sent to your account, please verify again.");

        let store_token = await Token.findOne({userId: user._id});
        if(!store_token){
          await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
          }).save();
        } else {
          const newToken = crypto.randomBytes(32).toString("hex");
          await Token.updateOne({userId: user._id},{token: newToken});
        }

        let token = await Token.findOne({userId: user._id});

        // const newToken = crypto.randomBytes(32).toString("hex");
        // await Token.updateOne({userId: user._id},{token: newToken});

        // let token = await Token.findOne({userId: user._id});

        const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, url);
      } else {
        if (user.role != req.body.role) {
          return res.status(400).send(`You are not a ${req.body.role}`);
        } else {
          user.comparePassword(req.body.password, function (err, isMatch) {

            if (err) return res.status(400).send(err);
            if (isMatch) {
              const tokenObject = { _id: user._id, email: user.email };
              const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
              res.send({ success: true, token: "JWT " + token, user });
            } else {
              res.status(400).send("Wrong password.");
            };
          });

        }
      }

    }

  } catch (err) {
    return res.status(400).send("Login error");
  }

};
