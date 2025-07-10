import React from "react";

const FastDelivery = () => {
  return (
    <section className=" bg-gray-50 mx-auto pt-24 pb-24 text-center min-h-[40vh]">
      <div className="m-auto flex flex-col items-center">
        <h1 className="text-5xl font-display font-bold text-dark mb-6">
          Lightning-Fast Delivery, Always on Time.
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          FlashCart ensures lightning-fast, reliable delivery so your
          discounted, near-expiry products arrive fresh, safe, and always right
          on time.
        </p>
        <a href="/products" className="inline-block bg-purple-400 cursor-pointer text-black px-4 py-2  hover:bg-purple-600/80 transition px-6 py-3 rounded-tr-2xl rounded-bl-2xl text-lg font-semibold shadow-md hover:bg-accent transition-all duration-200">
  Browse Fast-Delivering Products
</a>
      </div>
    </section>
  );
};

export default FastDelivery;
