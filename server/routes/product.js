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

router.get("/view-products", async (req, res) => {
  try {
    const myPro = await Product.find();
    res.send(201).send(myPro);
  } catch (e) {
    res.status(400).send(e);
    //   console.log(e.message);
  }
});

router.get("/view-products/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const myPro = await Product.findOne({ _id });
    if (!myPro) {
      return res.status(200).send();
    }
    res.send(myPro);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*router.patch("/update-products/:id", async (req, res) => {
  // const update = Object.keys(req.body);
  // const allowedUpdates = [" titleProduct", "" ];
  // const isValid = update.every((update) => allowedUpdates.includes(update));

  // if (!isValid) {
  //   return res.status(400).send({ error: "Invalid update!" });
  // }
  const _id = req.params.id;

  try {
    const myPro = await Product.findByIdAndUpdate(_id);
    //   const mycomp = await Company.findOne(_id);
    if (!myPro) {
      return res.status(404).send();
    }
    //   update.forEach((update) => (mycomp[update] = req.body[update]));
    //
    await myPro.save();
    res.send(myPro);
    console.log(myPro);
  } catch (e) {
    res.status(400).send(e.message);
  }
});*/

router.patch("/update-products/:id", async (req, res) => {
  const update = Object.keys(req.body);
  const allowedUpdates = ["titleProduct", "amount", "quantity"];
  const isValid = update.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  const _id = req.params.id;

  try {
    const myPro = await Product.findByIdAndUpdate(_id, req.body, { new: true });
    if (!myPro) {
      return res.status(404).send();
    }

    res.send(myPro);
    console.log(myPro);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/delete-products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const myPro = await Product.findOneAndDelete({ _id });

    if (!myPro) {
      return res.status(404).send();
    }
    res.send(myPro);
  } catch (e) {
    res.send(400).send(e);
  }
});
router.get("/", (req, res) => res.render("welcome"));

module.exports = router;
