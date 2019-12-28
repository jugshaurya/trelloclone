const router = require("express").Router();
const Authentication = require("../controllers/authentication");
const { isUserAuthenticated, localLogin } = require("../passport/passport");

router.post("/signup", Authentication.signup);
router.post("/signin", localLogin, Authentication.signin);

// protected Resources
router.post("/", isUserAuthenticated, (req, res) => {
  res.status(200).json({ message: `Hello ${req.user.name}` });
});

module.exports = router;
