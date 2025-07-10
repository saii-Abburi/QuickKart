const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  items: [
    {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: Number,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: String,
  phone: String,
  paymentMethod: String,
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

