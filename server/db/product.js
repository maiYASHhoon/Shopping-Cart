const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Category = require("../db/category").schema;

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
const productSchema = new mongoose.Schema({
  titleProduct: {
    type: String,
    //   required: true,
    //   trim: true,
  },
  shortDescription: {
    type: String,
  },
  fulldescription: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 0,
  },
  amount: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  Image: {
    type: String,
  },
  //  🎆🎆 this is what subschema looks like 🎆🎆
  category: {
    titleCategory: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      id: false,
    },
    descriptionCategory: {
      type: String,
    },
    Image: {
      type: String,
    },
    Status: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
