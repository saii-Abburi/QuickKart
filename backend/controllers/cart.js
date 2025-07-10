const cartModel = require("../models/cartModel");

const getCartByUserId = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const cart = await cartModel
    .findOne({ userId: userId })
    .populate("products.productId");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.status(200).json({ success: "true", cart: cart.products });
};


const createCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, products: [{ productId, quantity }] });
    } else {
      const index = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.status(200).json({ success: "true", message: "product Removed" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  console.log("clear cart called");
  const { userId } = req.body;
  if (!userId) {
    res.status(404).json({ message: "User id is required" });
  }
  try {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "UserId and ProductId required" });
  }

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCartByUserId, createCart, deleteCartItem , clearCart , updateCartQuantity};
