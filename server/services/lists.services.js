const List = require("../models/lists");

// Get all Board Lists
const getAllListsInBoard = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const lists = await List.find({ boardId });
    res.json(lists);
  } catch (e) {
    next(e);
  }
};

// Create a new List
const createNewList = async (req, res, next) => {
  try {
    // TODO client side data validation
    const { name } = req.body;
    console.log(name);
    const { boardId } = req.params;
    const newList = new List({
      name,
      order: 0, // will change later
      boardId,
      archived: false
    });

    res.json(await newList.save());
  } catch (e) {
    // will change later
    next(e);
  }
};

module.exports = {
  getAllListsInBoard,
  createNewList
};
