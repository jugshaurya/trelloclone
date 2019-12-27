const jwt = require("jsonwebtoken");
const config = require("../config");

const createToken = async createdUser => {
  const payload = {
    email: createdUser.email,
    id: createdUser._id
  };
  const token = await jwt.sign(payload, config.JWTSECRETKEY);
  return token;
};

module.exports = createToken;
