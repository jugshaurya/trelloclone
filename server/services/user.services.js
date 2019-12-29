const User = require("../models/users");
const createToken = require("../utils/createToken");

exports.signup = async (req, res, next) => {
  // TODO: Client Side Verification of req.body
  const { username, email, password, confirmPassword, avatarUrl } = req.body;

  if (password !== confirmPassword) {
    return res.status(422).json({
      message: "Passwords don't Match"
    });
  }

  const user = await User.findOne({ email });

  if (user)
    return res.status(422).json({
      message: "User already Available!"
    });

  try {
    const newUser = new User({
      username,
      email,
      password, // password will be hashed before `save`
      avatarUrl
    });

    const savedUser = await newUser.save();
    const token = await createToken(savedUser);
    res.status(201).json({ token, message: "New User Created" });
  } catch (error) {
    return next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = await createToken(req.user);
    return res
      .status(200)
      .json({ token, message: `Welcome Back ${req.user.username}` });
  } catch (error) {
    return next(error);
  }
};
