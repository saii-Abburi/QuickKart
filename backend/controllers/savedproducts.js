const userModel = require("../models/userModel");

// POST /users/:userId/save/:productId
const saveProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user.savedProducts.includes(productId)) {
      user.savedProducts.push(productId);
      await user.save();
    }
    res.status(200).json({ message: "Product saved" , savedProducts: user.savedProducts });
  } catch (err) {
    res.status(500).json({ error: "Failed to save product" });
  }
};

// DELETE /users/:userId/save/:productId
const unsaveProduct = async (req, res) => {

  const { userId, productId } = req.params;

  try {
    const user = await userModel.findById(userId);
    user.savedProducts = user.savedProducts.filter(
      (id) => {
        return id.toString() !== productId.toString();
      }
    );
    await user.save();
    res.status(200).json({ message: "Product unsaved" , savedProducts: user.savedProducts });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// GET /users/:userId/save
const getSavedProducts = async (req, res) => {

  try {
    const user = await userModel
      .findById(req.user.id)
      .populate("savedProducts");
    res.status(200).json({ saved: user.savedProducts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved products" });
  }
};

module.exports = { getSavedProducts, saveProduct, unsaveProduct };
