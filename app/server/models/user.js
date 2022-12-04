const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { string } = require("joi");

const credentialSchema = new mongoose.Schema({
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  instructor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  instructorUsername: String,
  holderUsername: String,
  institute: String,
  issuedDate: Date
});

const groupSchema = new mongoose.Schema({
  name: String,
  credentials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credential"
  }],
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
});

const resumeSchema = new mongoose.Schema({
  name: String,
  profile: {
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    phone: {type: String, default: ""},
    email: {type: String, default: ""},
    address: {type: String, default: ""},
    description: {type: String, default: ""},
  },
  credentials: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Credential"
  }],
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  profile: {
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    phone: {type: String, default: ""},
    email: {type: String, default: ""},
    address: {type: String, default: ""},
    description: {type: String, default: ""},
  },
  credentials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credential"
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }],
  resumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume"
  }],
  role: {
    type: String,
    enum: ["student", "instructor", "recruiter"],
    required: true,
  },
  enroll: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"   // student enroll courses
  }],
  teach: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"  // teacher teaching courses
  }],
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }],
  company:{
    type: String,
    default: ""
  },
  institute:{
    type: String,
    default: ""
  },
  verified: {
    type: Boolean,
    default: false
  },
});

userSchema.methods.isStudent = function () {
  return this.role == "student";
};
userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};
userSchema.methods.isRecruiter = function () {
  return this.role == "recruiter";
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) { // cb = callback
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};


// module.exports.Group = mongoose.model("Group",groupSchema) must be before userSchema.plugin(passportLocalMongoose);
module.exports.Group = mongoose.model("Group", groupSchema);
module.exports.Credential = mongoose.model("Credential", credentialSchema);
module.exports.User = mongoose.model("User", userSchema);
module.exports.Resume = mongoose.model("Resume", resumeSchema);
