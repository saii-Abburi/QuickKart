import React from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-16 px-4" id="contact">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Have questions, feedback, or want to partner with us? Reach out and our team will get back to you shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Contact Info */}
          <div className="text-left space-y-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-purple-500" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-purple-500" />
              <p>support@Quickcart.in</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-purple-500" />
              <p>Guntur, Andhra Pradesh, India</p>
            </div>

            <div className="pt-4">
              <p className="text-gray-600 mb-2 font-semibold">Follow Us:</p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 text-gray-500 hover:text-blue-600 transition" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 text-gray-500 hover:text-pink-500 transition" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6 text-gray-500 hover:text-blue-700 transition" />
                </a>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white font-medium px-6 py-2 rounded-md hover:bg-purple-600 transition"
            >
              Send Message
            </button>
          </form>

          
        </div>
      </div>
    </section>
  );
};

export default Contact;
