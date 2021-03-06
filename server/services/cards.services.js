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
    const { title, listId } = req.body;
    const { boardId } = req.params;
    const newCard = new Card({
      title,
      description: "Add Description",
      boardId,
      listId,
      archived: false,
      cardImage: "none",
      memberIds: []
    });

    res.json(await newCard.save());
  } catch (e) {
    // will change later
    next(e);
  }
};

// update the card's listId: updating the list, a card belongs to
const updateCard = async (req, res, next) => {
  try {
    // TODO client side data validation
    const updatedCard = req.body;
    const { _id } = req.body;
    // Some problem Solved using
    // Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.
    // The query executes if callback is passed else a Query object is returned.
    await Card.findByIdAndUpdate(_id, updatedCard);
    const card = await Card.findOne({ _id });
    res.status(201).json(card);
  } catch (e) {
    // will change later
    next(e);
  }
};

const uploadImage = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const _id = req.body._id;
  const body = { ...req.body };
  try {
    await Card.findByIdAndUpdate(_id, {
      ...body,
      memberIds: [],
      cardImage: url + "/uploads/" + req.file.filename
    });

    const card = await Card.findOne({ _id });
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCardsInBoard,
  createNewCard,
  updateCard,
  uploadImage
};
