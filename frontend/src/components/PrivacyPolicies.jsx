import React from 'react';

const LegalSection = () => {
  return (
    <section className="bg-slate-50  px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-10">Legal & Policies</h1>

      {/* Terms of Use */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>
        <p className="mb-2">
          Welcome to FlashCart. By accessing or using our website, you agree to be bound by these terms. Please read them carefully.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm leading-6">
          <li>You must be at least 18 years old to use this site.</li>
          <li>All product information and pricing are subject to change without notice.</li>
          <li>Misuse, illegal activities, or unauthorized access may result in termination of your access.</li>
          <li>We reserve the right to refuse service or cancel orders at our discretion.</li>
        </ul>
      </div>

      {/* Shipping & Returns */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Shipping & Returns</h2>
        <p className="mb-2">
          At FlashCart, we aim to provide timely and eco-conscious delivery services.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm leading-6">
          <li>Standard delivery takes 2–5 business days depending on your location.</li>
          <li>Shipping fees are displayed at checkout and may vary based on weight and destination.</li>
          <li>If you receive a damaged or expired product, notify us within 48 hours for a replacement or refund.</li>
          <li>Due to the nature of near-expiry deals, we do not accept returns unless the product is defective or incorrect.</li>
        </ul>
      </div>

      {/* Privacy Policy */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="mb-2">
          Your privacy is important to us. This policy explains how we collect, use, and safeguard your information.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm leading-6">
          <li>We collect personal information such as name, email, and address to process your orders.</li>
          <li>Your data is never sold. It is shared only with trusted partners involved in order fulfillment.</li>
          <li>We use cookies for a better browsing experience and analytics. You can disable them in your browser settings.</li>
          <li>All transactions are secured with SSL encryption and industry-standard safety protocols.</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          For any questions regarding our policies, contact us at <span className="text-primary font-medium">support@flashcart.in</span>.
        </p>
      </div>
    </section>
  );
};

export default LegalSection;
