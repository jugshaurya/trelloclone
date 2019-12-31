const Card = require("../models/cards");

// Get all Board Cards
const getAllCardsInBoard = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const cards = await Card.find({ boardId });
    res.json(cards);
  } catch (e) {
    next(e);
  }
};

// Create a new Card
const createNewCard = async (req, res, next) => {
  try {
    // TODO client side data validation
    const { title, description, listId } = req.body;
    const { boardId } = req.params;
    const newCard = new Card({
      title,
      description,
      order: 0, // will change later
      boardId,
      listId,
      archived: false
    });

    res.json(await newCard.save());
  } catch (e) {
    // will change later
    next(e);
  }
};

module.exports = {
  getAllCardsInBoard,
  createNewCard
};
