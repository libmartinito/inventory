const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
});

// virtual property for a book's URL
ItemSchema.virtual("url").get(function () {
  return "/inventory/items/" + this._id;
});

// export model
module.exports = mongoose.model("Item", ItemSchema);
