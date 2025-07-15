import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultForm = {
  name: "",
  actualPrice: "",
  discountedPrice: "",
  priceOff: "",
  expiryDate: "",
  type: "grocery",
  quantity: 1,
  weight: 1,
  images: [],
  description: "",
  tags: "",
  location: "",
};

const categories = [
  "grocery", "electronics", "clothing", "furniture", "books", "toys", "beauty",
  "sports", "automotive", "health", "stationery", "kitchen", "footwear",
  "jewelry", "home decor", "pet supplies"
];

const CreateProductForm = ({ initialData = null, isEdit = false, onSuccess }) => {
  const [formData, setFormData] = useState(defaultForm);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultForm, ...initialData });
    }
  }, [initialData]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64 = await Promise.all(files.map(convertToBase64));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...base64] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, sellerId: userId };
      const url = isEdit
        ? `${import.meta.env.VITE_HOST_STRING}/app/v1/products/${initialData._id}`
        : `${import.meta.env.VITE_HOST_STRING}/app/v1/products`;

      const method = isEdit ? "patch" : "post";

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`✅ Product ${isEdit ? "updated" : "created"} successfully!`);
      if (!isEdit) setFormData(defaultForm);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("❌ Failed to submit product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-3xl shadow-2xl border border-purple-100">
      <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
        {isEdit ? "✏️ Edit Product" : "📦 Create New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="input" required />

        <div className="grid grid-cols-2 gap-4">
          <input name="actualPrice" type="number" value={formData.actualPrice} onChange={handleChange} placeholder="Actual Price" className="input" />
          <input name="discountedPrice" type="number" value={formData.discountedPrice} onChange={handleChange} placeholder="Discounted Price" className="input" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="priceOff" type="number" value={formData.priceOff} onChange={handleChange} placeholder="Price Off (%)" className="input" />
          <input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} className="input" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="input" />
          <input name="weight" type="number" step="0.01" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="input" />
        </div>

        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" />

        <select name="type" value={formData.type} onChange={handleChange} className="input bg-white">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>

        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Features (comma separated)" className="input" />
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Description" className="input resize-none" />

        <input type="file" multiple accept="image/*" onChange={handleImagesChange} className="input p-2 file:bg-purple-100 file:rounded" />

        {formData.images.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-3">
            {formData.images.map((img, i) => (
              <img key={i} src={img} alt="preview" className="w-24 h-24 rounded border object-cover shadow" />
            ))}
          </div>
        )}

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
