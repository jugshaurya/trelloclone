const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Board = mongoose.model("boards", boardSchema);

module.exports = Board;
