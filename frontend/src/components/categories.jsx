import React from "react";
import { Leaf, ShoppingBag, Package, Sparkles } from "lucide-react";

const categories = [
  {
    name: "Groceries",
    icon: <ShoppingBag className="w-8 h-8 text-purple-600" />,
    description: "Daily essentials at the best prices, delivered fresh.",
  },
  {
    name: "Cosmetics",
    icon: <Sparkles className="w-8 h-8 text-pink-500" />,
    description: "Beauty products that are gentle on you and the planet.",
  },
  {
    name: "Packaged Food",
    icon: <Package className="w-8 h-8 text-yellow-500" />,
    description: "Delicious deals on snacks, grains, and ready-to-eats.",
  },
  {
    name: "Eco Essentials",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    description: "Sustainable, everyday items that care for Earth.",
  },
];

const Categories = () => {
  return (
    <section className=" bg-gray-50 min-h-[40vh] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Shop by Category
      </h2>
      <div className="max-w-7xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4">
              {cat.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
