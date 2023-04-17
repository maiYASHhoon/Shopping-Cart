const express = require("express");
const router = express.Router();
const Category = require("../db/category");

router.post("/add-category", async (req, res, next) => {
  const myCat = new Category(req.body);
  try {
    await myCat.save();
    req.myCat = myCat;
    res.status(201).send(myCat);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/view-category", async (req, res) => {
  try {
    const myCat = await Category.find();
    res.status(201).send(myCat);
  } catch (e) {
    res.status(400).send(e);
    //   console.log(e.message);
  }
});

router.get("/view-category/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const myCat = await Category.findOne({ _id });
    if (!myCat) {
      return res.status(200).send();
    }
    res.send(myCat);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.patch("/update-category/:id", async (req, res) => {
  const update = Object.keys(req.body);
  const allowedUpdates = ["status", , "title"];
  const isValid = update.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  const _id = req.params.id;

  try {
    const myCat = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!myCat) {
      return res.status(404).send();
    }

    res.send(myCat);
    //   console.log(myCat);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/delete-category/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const myCat = await Category.findOneAndDelete({ _id });

    if (!myCat) {
      return res.status(404).send();
    }
    res.send(myCat);
  } catch (e) {
    res.send(400).send(e);
  }
});
//   router.get("/", (req, res) => res.render("welcome"));

module.exports = router;
