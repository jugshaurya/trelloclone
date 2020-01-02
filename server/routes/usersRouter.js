const router = require("express").Router();
const usersServices = require("../services/users.services");
const { localLogin, isUserAuthenticated } = require("../passport/passport");

router.post("/signup", usersServices.signup);
router.post("/signin", localLogin, usersServices.signin);

router.get("/", isUserAuthenticated, usersServices.getUser);

module.exports = router;
