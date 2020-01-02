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
    return res.status(200).json({
      token,
      message: `Welcome Back ${req.user.username}`
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password"
      );
      //  ====== Not working Approach =====
      // console.log("current user", req.user);
      // const sendUser = { ...req.user };
      // delete sendUser.password;

      return res.status(200).json(user);
    } else {
      throw new Error("No Signed in User");
    }
  } catch (error) {
    return next(error);
  }
};
