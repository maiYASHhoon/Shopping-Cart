const express = require("express");
const router = express.Router();
const Category = require("../db/category");

router.post("/add-category", async (req, res) => {
  const myCat = new Category(req.body);
  try {
    await myCat.save();
    res.status(201).send(myCat);
  } catch (e) {
    res.status(400).send(e);
  }
});
//   router.get("/", (req, res) => res.render("welcome"));

module.exports = router;
