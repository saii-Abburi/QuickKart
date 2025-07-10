import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CreditCard, IndianRupee, MapPin, Phone, Truck } from "lucide-react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const items = cartItems.map((item) => ({
    productId: item.productId._id, // Adjust based on your field
    name: item.name,
    quantity: item.quantity,

    discountedPrice: item.discountedPrice,
  }));

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.productId.discountedPrice * item.quantity,
    0
  );
  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("Please enter address and phone number.");
      return;
    }

    try {
      const userId = window.localStorage.getItem("userId");
      const token = window.localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/app/v1/orders/place",
        {
          userId,
          items,
          address,
          phone,
          paymentMethod,
          totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-10 px-4 md:px-10 font-[Roboto]">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
          <Truck className="w-6 h-6" />
          Checkout
        </h1>

        {/* Cart Summary */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Your Items
          </h2>
          <div className="divide-y rounded-xl bg-slate-50 p-4 shadow-inner">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex justify-between py-2"
              >
                <div>
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-purple-700">
                  ₹{(item.productId.discountedPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="pt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Address & Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Shipping Details
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                placeholder="Delivery Address"
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Payment Method
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Cash on Delivery", value: "cod" },
              { label: "UPI", value: "upi" },
              { label: "Card", value: "card" },
            ].map(({ label, value }) => (
              <label
                key={value}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition ${
                  paymentMethod === value
                    ? "bg-purple-600 text-white border-purple-700"
                    : "bg-white hover:bg-purple-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  className="hidden"
                  checked={paymentMethod === value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CreditCard className="w-5 h-5" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-purple-900 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
