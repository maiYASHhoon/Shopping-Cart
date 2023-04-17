const express = require("express");
const router = express.Router();
const Product = require("../db/product");
// const multer = require("multer");

// let storage = multer.diskStorage({
//   destination: "assets/images/",
//   filename: (req, file, cb) => {
//     // cb(null, Date.now(+file+originalname))
//     cb(null, file.originalname);
//   },
// });
// // console.log("storage", storage);
// let upload = multer({
//   storage: storage,
// }).upload.single("image");

router.post("/add-products", async (req, res) => {
  const myPro = new Product(req.body);
  try {
    await myPro.save();
    const myCat = req.myCat; //  to access myCat from req object
    console.log(myCat);
    res.status(201).send(myPro);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*router.get("/view-products", async (req, res) => {
  try {
    const myPro = await Product.find({});
    res.status(201).send(myPro);
    // const myPro = await Product.findOne({ _id });
    // if (!myPro) {
    //   return res.status(200);
    // }
    // res.send(myPro);
  } catch (e) {
    res.status(400).send(e);
    //   console.log(e.message);
  }
});*/

router.get("/view-products/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      const myPro = await Product.findOne({ _id: req.params.id });
      console.log(myPro);
      if (!myPro) {
        return res.status(404).send("Product not found");
      }
      res.send(myPro);
    } else {
      const myProd = await Product.find({});
      res.send(myProd);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch(
  "/update-products/:id",
  //   upload.single("image"),
  async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = [
      "titleProduct",
      "shortDescription",
      "amount",
      "quantity",
      //   "image",
    ];
    const isValid = update.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
      return res.status(400).send({ error: "Invalid update!" });
    }

    const _id = req.params.id;

    try {
      const myPro = await Product.findByIdAndUpdate(
        _id,
        {
          ...req.body,
          // image: req.file.path
        },
        { new: true }
      );
      if (!myPro) {
        return res.status(404).send();
      }

      res.send(myPro);
      console.log(myPro);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

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
