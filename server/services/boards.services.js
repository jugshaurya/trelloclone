const Board = require("../models/boards");

// Get all Boards
const getAllBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({ ownerId: req.user._id });
    res.json(boards);
  } catch (e) {
    next(e);
  }
};

// get a single board with id in parameter
const getBoard = async (req, res, next) => {
  // validate client side Params ID if required!
  try {
    const boardId = req.params.id;
    const result = await Board.findOne({ _id: boardId });
    // post-find hook
    if (result.ownerId.toString() !== req.user._id.toString()) {
      res.status(401).json({
        message: "You are not the owner of this Board, Access Your Boards only"
      });
    }
    if (!result) return res.status(400).json("Invalid ID");
    res.json(result);
  } catch (e) {
    next(e);
  }
};

// Create a new Board
const createNewBoard = async (req, res, next) => {
  try {
    // TODO client side data validation
    const { name, background } = req.body;
    const newBoard = new Board({
      name,
      background,
      ownerId: req.user._id,
      memberIds: []
    });

    res.json(await newBoard.save());
  } catch (e) {
    next(e);
  }
};

// Delete a new Board
const deleteBoard = async (req, res, next) => {
  try {
    // TODO client side data validation
    const boardId = req.body._id;
    const deletedBoard = await Board.findOneAndRemove({ _id: boardId });
    res.json(deletedBoard);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllBoards,
  createNewBoard,
  getBoard,
  deleteBoard
};
