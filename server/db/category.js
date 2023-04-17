const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("Database Connection Established");
});
mongoose.connection.on("error", (error) => {
  console.log("Database ERROR: " + error);
});
const initConnection = (callback) => {
  let options = {};
  if (process.env.isProduction == true || process.env.isProduction == "true") {
  }
};
mongoose.set("debug", true);

mongoose.connect("mongodb://127.0.0.1:27017/ShoppingCart");
const id = new mongoose.Schema.ObjectId();
const categorySchema = new mongoose.Schema({
  titleCategory: {
    type: String,
  },
  descriptionCategory: {
    type: String,
  },
  Image: {
    type: String,
  },
  Status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
