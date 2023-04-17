const express = require("express");
const router = express.Router();
const Product = require("../db/product");

router.post("/add-products", async (req, res) => {
  const myPro = new Product(req.body);
  try {
    await myPro.save();
    res.status(201).send(myPro);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/", (req, res) => res.render("welcome"));

module.exports = router;
