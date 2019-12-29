const router = require("express").Router();
const Board = require("../models/boards");

// Get all Boards
router.get("/", async (req, res, next) => {
  try {
    console.log(req.user);
    const boards = await Board.find({ ownerId: req.user._id }).populate(
      "ownerId"
    );
    res.json({ boards });
  } catch (e) {
    next(e);
  }
});

// Create a new Board
const createNewBoard = async (req, res) => {
  // TODO client side data validation
  const { boardName, boardBackground } = req.body;
  const newBoard = new Board({
    boardName,
    boardBackground,
    // ownerId: req.user.id,
    memberIds: []
  });

  res.json({ newBoard: await newBoard.save() });
};
router.post("/", createNewBoard);

module.exports = router;
