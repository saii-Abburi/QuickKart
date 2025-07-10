

import AboutSection from "../components/About";
import Categories from "../components/categories";
import Contact from "../components/Contact";
import FaqSection from "../components/FaqSection";
import FastDelivery from "../components/FastDelivery";
import ProductCard from "../components/ProductCard";

const Herosection = () => {
  return (
    <section className="bg-purple-400 pt-22 ">
      <div className="max-w-6xl mx-auto text-center min-h-[40vh] pb-22">
        <h1 className="text-5xl font-display font-bold text-dark mb-6">
          Save Big, Waste Less.
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Discover high-quality products close to expiry — up to 80% off. Shop
          smart, save more, and fight waste with every order.
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-black px-6 py-3 rounded-tr-2xl rounded-bl-2xl text-lg font-semibold shadow-md hover:bg-accent transition-all duration-200"
        >
          Start Shopping
        </a>
      </div>
      <Categories/>
      <FastDelivery/>
      <Contact/>
      <AboutSection/>
      <FaqSection/>

    </section>
  );
};

export default Herosection;
