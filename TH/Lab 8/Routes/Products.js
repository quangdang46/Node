const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../middlewares/verifytoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { name, price, picture, description } = req.body;

  try {
    const newProduct = new Product({
      name: name,
      price: price,
      picture: picture,
      description: description,
    });

    await newProduct.save();

    res.status(200).json({ message: "Product created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, price, picture, description } = req.body;

  try {
    const product = await Product.findById(id);

    product.name = name;
    product.price = price;
    product.picture = picture;
    product.description = description;

    await product.save();

    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
