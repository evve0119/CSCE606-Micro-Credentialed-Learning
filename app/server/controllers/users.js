const User = require("../models").User;
const Credential = require("../models").Credential;
const Group = require("../models").Group;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken")

module.exports.renderRegister = async (req, res, next) => {
  // res.render("users/register.ejs");
};

module.exports.register = async (req, res) => {
  // try {
  //     const { username, email, password } = req.body;
  //     const user = new User({ username, email });
  //     const registerdUser = await User.register(user, password);
  //     req.login(registerdUser, (err) => {
  //         if (err) {
  //             return next(err);
  //         }
  //         req.flash("success", "Register Successfully!!!")
  //         res.redirect(`/myHomePage/${registerdUser._id}`);
  //     })
  // } catch (e) {
  //     req.flash("error", e.message);
  //     res.redirect("/register");
  // }

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
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    res.status(400).send("User not saved.");
  }
};

module.exports.renderLogin = (req, res) => {
  // res.render("users/login.ejs");
};

module.exports.login = (req, res, next) => {
  // req.flash("success","Welcome back");
  // console.log("login");
  // res.redirect(`/myHomePage/${req.user._id}`);

  // check the validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("User not found.");
    } else {
      if(user.role!=req.body.role){
        res.status(401).send(`You are not a ${req.body.role}`);
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          res.status(401).send("Wrong password.");
        }
      });
    }
  });
};

module.exports.logout = (req, res) => {
  // req.logout(function (err) {
  //     if (err) { return next(err); }
  //     req.flash('success', "Goodbye!");
  //     res.redirect('/login');
  // });
};

// module.exports.myHomePage = async (req, res) => {
//     const currentUser = await User.findById(req.params.id).populate({
//         path: "groups",
//         populate: {
//             path: "credentials"
//         }
//     });
//     res.send(currentUser)
//     // res.render("users/myHomePage.ejs", {currentUser});
// };

module.exports.renderNewGroupForm = async (req, res) => {
  const currentUser = await User.findById(req.params.id).populate('credentials');
  // res.render("users/newGroup.ejs",{currentUser})
}

// module.exports.createNewGroup = async (req, res) => {
//     // save new group
//     try{
//       const { groupName, addCredentials } = req.body;
//       const currentGroup = new Group({ name: groupName, holder: req.params.id, credentials: addCredentials});
//       await currentGroup.save()
//       // push group to this user
//       const holder = await User.findById(req.params.id);
//       holder.groups.push(currentGroup._id);
//       await holder.save()
//     } catch(err){
//       res.status(400).send("Failed to create");
//     }
//     // redirect to home page
//     res.send("Successfully add new credential")
// }

// module.exports.renderGroupForm = async (req, res) => {
//     const currentGroup = await Group.findById(req.params.groupId)
//     // const currentUser = await User.findById(req.params.id).populate({
//     //     path: "groups",
//     //     populate: {
//     //         path: "credentials"
//     //     }
//     // }).populate('credentials');
//     res.send(currentGroup)
//     // res.render("users/editGroup.ejs",{currentGroup,currentUser})
// }

// module.exports.updateGroup = async (req,res) => {
//     const currentGroup = await Group.findById(req.params.groupId)
//     await currentGroup.update({$set:{credentials:req.body.editCredentials,name:req.body.newGroupName}})
//     res.send("Successfully update!!!")
//     // res.redirect(res.redirect(`/myHomePage/${req.params.id}`))
// }

// module.exports.deleteGroup = async (req,res) => {
//     const currentUser = await User.findById(req.params.id)
//     await currentUser.update({$pull:{groups:req.params.groupId}})
//     await Group.findByIdAndDelete(req.params.groupId);
//     req.send("Successfully delete!!!")
//     res.redirect(res.redirect(`/myHomePage/${req.params.id}`))
// }

// module.exports.renderAllCredentials = async (req,res) =>{
//     try{
//         const currentUser = await User.findById(req.params.id).populate('credentials')
//         res.send(currentUser.credentials)
//     } catch (err) {
//         res.status(500).send("Error!! Cannot get credential!!");
//     }
//     // res.render("users/allCredentials.ejs",{currentUser})
// }

// module.exports.addCredential = async (req, res) => {
//     // save new credential
//     const { credentialName } = req.body;
//     const currentCredential = new Credential({ name:credentialName, holder: req.params.id});
//     try {
//         await currentCredential.save()
//       } catch (err) {
//         res.status(400).send("Cannot save credential.");
//       }
//     // push credentials to this user
//     const holder = await User.findById(req.params.id);
//     holder.credentials.push(currentCredential._id);
//     try {
//         await holder.save()
//         res.status(200).send("New credential has been saved.");
//       } catch (err) {
//         res.status(400).send("Cannot save credential.");
//       }
//     // search all this user's credentials
//     // res.redirect(res.redirect(`/allCredentials/${req.params.id}`))
// };
