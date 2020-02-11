const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema(
  {
    name: {
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


const List = mongoose.model("lists", listSchema);

module.exports = List;
