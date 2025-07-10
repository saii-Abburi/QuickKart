import { Facebook, Instagram, Linkedin, PaperclipIcon, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#101820] text-white p-5  flex gap-4 justify-around max-md:flex-col">
      <div className="f1  flex flex-col items-start gap-2">
        <span>
            <h1 className="text-4xl font-bold">
          Quick <br />
          Cart
        </h1>
        <p> QuickCart is committed to reducing waste.</p>
        </span>
       <span> <p>@ copyright Quick Cart</p>
        <p>
          Website designed by <span className="underline"> Sai</span>
        </p></span>
        <div className="flex items-center gap-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-8 h-8 p-1 border-2 rounded-full hover:text-blue-600" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-8 h-8 p-1 border-2 rounded-full hover:text-pink-500" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-8 h-8 p-1 border-2 rounded-full hover:text-blue-500" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-8 h-8 p-1 border-2 rounded-full hover:text-red-600" />
          </a>
        </div>
      </div>
      <div className="f2 flex flex-col gap-2">
        <h1 className="font-bold text-gray-500">Shop</h1>
        <a href="/products"className="hover:underline underline-offset-2">New</a>
        <a href="/products"className="hover:underline underline-offset-2">all products</a>
        <a href="/products" className="hover:underline underline-offset-2">best products</a>
        <a href="/products" className="hover:underline underline-offset-2">value set</a>
      </div>
      <div className="f3 flex flex-col gap-2">
        <h1 className="font-bold text-gray-500">help</h1>
        <a href="/about" className="hover:underline underline-offset-2">about us</a>
        <a href="/terms" className="hover:underline underline-offset-2">shipping & returns</a>
        <a href="/faq" className="hover:underline underline-offset-2">faq</a>
        <a href="/contact" className="hover:underline underline-offset-2">contact</a>
        <a href="/terms" className="hover:underline underline-offset-2">privacy policy</a>
        <a href="/terms" className="hover:underline underline-offset-2">terms of use</a>
      </div>
      <div className="f3 flex flex-col gap-2">
        <h1 className="font-bold text-gray-500">contact</h1>
        <span>
            <h2>phone:</h2>
            <p className="text-sm font-light">+91 9876543210</p>
        </span>
        <span>
            <h2>customer service:</h2>
            <p className="text-sm font-light">123-345-678-901</p>
        </span>
        <span>
            <h2>customer service email:</h2>
            <p className="text-sm font-light">support@quickkart.com</p>
        </span>
        <span>
            <h2>address:</h2>
            <p className="text-sm font-light">477 Heordf , Main Street , Wayne</p>
        </span>
      </div>
      <div className="f4">
        <h1 className="font-bold text-gray-500">Subscribe to our News letter:</h1>
        <span>
            <input type="text" placeholder="Your mail..." className="p-2 rounded-tr-2xl rounded-bl-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            <button className="bg-violet-500 cursor-pointer p-2 rounded-tr-2xl rounded-bl-2xl">Subscribe</button>
        </span>
        
      </div>

    </footer>
  );
};

export default Footer;
