const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    cardImage: {
      type: String
    },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    ],
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

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
