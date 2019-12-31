const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachCardsHooks = require("../hooks/cards.hooks");
const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },

    order: {
      type: String,
      default: 0,
      required: true
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "boards",
      required: true
    },

    listId: {
      type: Schema.Types.ObjectId,
      ref: "lists",
      required: true
    },

    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: []
      }
    ],
    archived: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

attachCardsHooks(cardSchema);

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
