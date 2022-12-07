// Verify whether data is validate
// Customize error message

const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).regex(/\w/).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor", "recruiter"),
    profile:{
      firstname: Joi.string().min(1).max(50).regex(/\w/).required(),
      lastname: Joi.string().min(1).max(50).regex(/\w/).required()
    }
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor", "recruiter"),
  });
  return schema.validate(data);
};

// Reset Validation
const resetValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string().min(6).max(255).required(),
  }).unknown();

  return schema.validate(data);
};

// student Validation
const profileValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(50).regex(/\w/).required(),
    lastName: Joi.string().min(1).max(50).regex(/\w/).required(),
    email: Joi.string().min(6).max(100).email().allow(null, ''),
    phone:Joi.string().regex(/\d/).min(10).max(10).allow(null, ''),
    address: Joi.string().max(500).allow(null, ''),
    description: Joi.string().max(5000).allow(null, ''),
  });
  return schema.validate(data);
}
const groupValidation = (data) => {
  const schema = Joi.object({
    groupName: Joi.string().min(1).max(50).required(),
    addCredentials: Joi.array(),
  });
  return schema.validate(data);
}
const resumeValidation = (data) => {
  const schema = Joi.object({
    resumeName: Joi.string().min(1).max(50).required(),
    addProfile: {
      firstName: Joi.string().min(1).max(50).regex(/\w/).required(),
      lastName: Joi.string().min(1).max(50).regex(/\w/).required(),
      email: Joi.string().min(6).max(100).email().required(),
      phone:Joi.string().regex(/\d/).min(10).max(10).allow(null, ''),
      address: Joi.string().max(500).allow(null, ''),
      description: Joi.string().max(5000).allow(null, ''),
    },
    addCredentials: Joi.array(),
  });
  return schema.validate(data);
}
const emailValidation = (data) => {
  const schema = Joi.object({
    studentEmail: Joi.string().min(6).max(100).required().email(),
  });
  return schema.validate(data);
}

// instructor validation
const instructorValidation = (data) => {
  const schema = Joi.object({
    editProfile:{
      firstName: Joi.string().min(1).max(50).regex(/\w/).required(),
      lastName: Joi.string().min(1).max(50).regex(/\w/).required(),
      email: Joi.string().min(6).max(100).email().allow(null, ''),
      phone:Joi.string().regex(/\d/).min(10).max(10).allow(null, ''),
      address: Joi.string().max(500).allow(null, ''),
      description: Joi.string().max(5000).allow(null, '')
    },
    editInstitute: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(data);
}

const courseValidation = (data) => {
  const schema = Joi.object({
    courseName: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(5000).required(),
    addStudentsId: Joi.array(),
  })
  return schema.validate(data);
}

// recruiter validation
const recruiterValidation = (data) => {
  const schema = Joi.object({
    editProfile:{
      firstName: Joi.string().min(1).max(50).regex(/\w/).required(),
      lastName: Joi.string().min(1).max(50).regex(/\w/).required(),
      email: Joi.string().min(6).max(100).email().allow(null, ''),
      phone:Joi.string().regex(/\d/).min(10).max(10).allow(null, ''),
      address: Joi.string().max(500).allow(null, ''),
      description: Joi.string().max(5000).allow(null, '')
    },
    editCompany: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(data);
}

const jobValidation = (data) => {
  const schema = Joi.object({
    jobName: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(2000).required(),
  })
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.resetValidation = resetValidation;
module.exports.profileValidation = profileValidation;
module.exports.groupValidation = groupValidation;
module.exports.resumeValidation = resumeValidation;
module.exports.emailValidation = emailValidation;
module.exports.instructorValidation = instructorValidation;
module.exports.courseValidation = courseValidation;
module.exports.recruiterValidation = recruiterValidation;
module.exports.jobValidation = jobValidation;
