const Board = require("../models/boards");

// Get all Boards
const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ ownerId: req.user._id });
    res.json({ boards });
  } catch (e) {
    next(e);
  }
};

// get a single board with id in parameter

const getBoard = async (req, res, next) => {
  // validate client side Params ID if required!
  console.log(req.params);
  try {
    const result = await Board.findOne({ _id: req.params.id });
    console.log(result);
    if (!result) return res.status(400).json("Invalid ID");
    res.json(result);
  } catch (e) {
    next(e);
  }
};

// Create a new Board
const createNewBoard = async (req, res) => {
  try {
    // TODO client side data validation
    const { name, background } = req.body;
    const newBoard = new Board({
      name,
      background,
      ownerId: req.user.id,
      memberIds: []
    });

    res.json(await newBoard.save());
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllBoards,
  createNewBoard,
  getBoard
};