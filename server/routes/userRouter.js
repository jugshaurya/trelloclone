const router = require("express").Router();
const userServices = require("../services/user.services");
const { localLogin } = require("../passport/passport");

router.post("/signup", userServices.signup);
router.post("/signin", localLogin, userServices.signin);

module.exports = router;
