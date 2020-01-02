const router = require("express").Router();
const usersRouter = require("./usersRouter");
const boardsRouter = require("./boardsRouter");
const listsRouter = require("./listsRouter");
const cardsRouter = require("./cardsRouter");
const { isUserAuthenticated } = require("../passport/passport");

router.use("/user", usersRouter);

// protected Resources
router.use("/boards", isUserAuthenticated, boardsRouter);
router.use("/lists", isUserAuthenticated, listsRouter);
router.use("/cards", isUserAuthenticated, cardsRouter);

// router.use("/", (req, res, next) => {
//   res.json(`Hello Hello from server`);
// });

module.exports = router;
