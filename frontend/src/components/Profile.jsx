import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  User2,
  Mail,
  Trash2,
  Save,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import fetchUserDetails from "../hooks/useFecthUser";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const fetchDetails = async () => {
    const userData = await fetchUserDetails();
    if (!userData) {
      setStatus("Error fetching user details");
    }
    setUser(userData);
    setFormData({ name: userData.name, email: userData.email });
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_HOST_STRING}/app/v1/orders/user/${decoded.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data.orders);
      
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const endpoint = `${import.meta.env.VITE_HOST_STRING}/app/v1/users/${decoded.userId}`;
      await axios.patch(endpoint, formData);
      setStatus("✅ User updated successfully!");
    } catch (error) {
      console.error("Failed to update user", error);
      setStatus("❌ Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;
    try {
      const endpoint = `${import.meta.env.VITE_HOST_STRING}/app/v1/users/${decoded.userId}`;
      await axios.delete(endpoint);
      localStorage.clear();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete user", error);
      setStatus("❌ Failed to delete account");
    }
  };

  const handleShowOrders = () => {
    fetchOrders();
    setShowOrders(true);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <section className="bg-gradient-to-br from-purple-100 to-white min-h-screen py-12 px-4 relative font-[Roboto]">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-8 relative z-10 border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`}
            alt="avatar"
            className="w-16 h-16 rounded-full border shadow-sm"
          />
          <div>
            <h2 className="text-2xl font-bold text-purple-700">
              {formData.name}
            </h2>
            <p className="text-gray-500">Welcome back 👋</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="flex items-center border rounded-xl px-4 bg-gray-50 shadow-inner">
              <User2 className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border rounded-xl px-4 bg-gray-50 shadow-inner">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Save className="w-4 h-4" /> Update
            </button>

            <button
              onClick={handleDelete}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>

          <button
            onClick={handleShowOrders}
            className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag className="w-5 h-5" /> View My Orders
          </button>
        </div>

        {status && (
          <div className="mt-6 text-center text-sm text-purple-800 bg-purple-100 border border-purple-200 p-3 rounded-xl font-medium">
            {status}
          </div>
        )}
      </div>

      {/* Orders Overlay Modal */}
      {showOrders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center px-4 font-[Roboto]">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowOrders(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              My Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-500 text-center">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gradient-to-br from-slate-50 to-white"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-gray-700">
                        Order ID: #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 capitalize">
                        {order.status}
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-2">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.productId.name} x {item.quantity}
                        </li>
                        
                        
                      ))}
                    </ul>
                    <div className="text-sm text-gray-600 flex justify-between">
                      <span>Total: ₹{order.totalAmount.toFixed(2)}</span>
                      <span className="text-xs">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
