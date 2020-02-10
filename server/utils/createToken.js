const jwt = require("jsonwebtoken");
const JWTSECRETKEY = process.env.TRELLO_JWTSECRETKEY;

const createToken = async createdUser => {
  const payload = {
    _id: createdUser._id
  };
  const token = await jwt.sign(payload, JWTSECRETKEY);
  return token;
};

module.exports = createToken;
