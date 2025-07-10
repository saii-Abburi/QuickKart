import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const FaqSection = () => {
  const faq = [
    {
      question: "What is FlashCart?",
      answer: "FlashCart is a sustainable e-commerce platform that offers great deals on high-quality products — especially those that are nearing their expiry date. Our mission is to help customers save more while reducing waste."
    },
    {
      question: "Are the products safe to use if they’re close to expiry?",
      answer: "Absolutely. All our products are certified safe and go through quality checks before shipping. Near-expiry items are clearly labeled with dates, and we ensure you have enough time to use them."
    },
    {
      question: "How can I track my order?",
      answer: "After placing your order, you’ll receive a tracking link via email or SMS. You can also log into your FlashCart account and check your order status from the dashboard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI, debit/credit cards, net banking, and major wallets like PhonePe and Google Pay. All transactions are secured and encrypted."
    },
    {
      question: "Can I return or replace a product?",
      answer: "Yes, if your item arrives damaged or expired before delivery, you can request a replacement or full refund within 48 hours of delivery."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via the contact form on our website, email us at support@flashcart.in, or call us at +91 98765 43210 between 10AM – 6PM (Mon–Fri)."
    },
    {
      question: "Is there a loyalty or rewards program?",
      answer: "Yes! Our loyalty program rewards you with points on every purchase. You can redeem them on future orders or access exclusive deals."
    },
    {
      question: "Why choose FlashCart over other e-commerce sites?",
      answer: "FlashCart is built for smart, eco-conscious shoppers. We offer unbeatable prices on fresh, safe products while contributing to a greener planet by reducing waste."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-purple-400 py-12 px-6 text-black" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="bg-white text-gray-800 rounded-lg shadow-md p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-semibold">{item.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-3 text-gray-600 transition duration-300">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
