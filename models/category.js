const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// virtual for the category's URL
CategorySchema.virtual("url").get(function () {
  return "/inventory/categories/" + this._id;
});

// export model
module.exports = mongoose.model("Category", CategorySchema);
