import React from 'react';
import { Truck, ShieldCheck, Leaf, Users, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck className="w-8 h-8 text-purple-500" />,
    title: "Fast & Reliable Delivery",
    description:
      "We ensure all orders reach you quickly and securely with sustainable packaging.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    title: "Trusted Quality",
    description:
      "Every product undergoes quality checks — even near-expiry items are safe and usable.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-purple-500" />,
    title: "Eco-Conscious Mission",
    description:
      "By saving near-expiry goods, we reduce food and packaging waste together.",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    title: "Customer-First Approach",
    description:
      "Our user-friendly interface, support team, and feedback loops put you first always.",
  },
];

const stats = [
  { label: "Orders Delivered", value: "12,000+" },
  { label: "Products Saved", value: "38,500+" },
  { label: "Happy Customers", value: "9,200+" },
  { label: "CO₂ Saved (kg)", value: "5,100+" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-20 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-6"
        >
          About FlashCart
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          At FlashCart, we're redefining online shopping by connecting customers with amazing deals on quality, near-expiry goods — all while helping reduce waste and promote sustainability.
        </motion.p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-purple-50 rounded-xl py-12 px-6 text-center">
          <h3 className="text-2xl font-bold text-purple-700 mb-8">FlashCart by the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="text-3xl font-bold text-purple-600">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="text-2xl font-semibold mb-4 text-gray-800">Join our mission to reduce waste & save big</h4>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-full transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Start Shopping
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
