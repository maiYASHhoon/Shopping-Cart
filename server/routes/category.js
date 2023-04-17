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

router.get("/view-category/:id?", async (req, res) => {
  const { page = 1, limit = 1 } = req.query;
  try {
    if (req.params.id) {
      const myCat = await Category.findOne({ _id: req.params.id });
      if (!myCat) {
        return res.status(404).send("Category not found");
      }
      res.send(myCat);
    } else {
      const count = await Category.countDocuments();
      const myCate = await Category.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      res.send({
        products: myCate,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    }
  } catch (e) {
    res.status(400).send(e.message);
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
