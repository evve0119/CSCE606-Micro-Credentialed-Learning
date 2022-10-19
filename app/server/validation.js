// Verify whether data is validate
// Customize error message

const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor"),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

// const credentialValidation = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().min(1).max(50).required()
//   });
//   return schema.validate(data);
// };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
// module.exports.credentialValidation = credentialValidation;
