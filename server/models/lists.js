const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachListsHooks = require("../hooks/lists.hooks");
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
      ref: "boards"
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

attachListsHooks(listSchema);

const List = mongoose.model("lists", listSchema);

module.exports = List;
