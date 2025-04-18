const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is incorrect");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is incorrect");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is incorrect");
  }
};

const validateUpdateProfileData = (req) => {
  const Update_Allowed_Fields = [
    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",
  ];

  const isUpdateAllowed = Object.keys(req.body).every((field) =>
    Update_Allowed_Fields.includes(field)
  );

  if (!isUpdateAllowed) {
    throw new Error("Invalid update fields");
  }
};

module.exports = { validateSignUpData, validateUpdateProfileData };
