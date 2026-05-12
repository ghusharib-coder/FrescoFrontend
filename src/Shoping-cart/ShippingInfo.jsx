import React, { useState } from "react";
import "./ShippingInfo.css";

const ShippingInfo = () => {
  const [activeCountry, setActiveCountry] = useState("us");

  const shippingOptions = {
    us: [
      { method: "Standard Shipping", days: "5-7", cost: "Free" },
      { method: "Express Shipping", days: "2-3", cost: "$15" },
      { method: "Overnight", days: "1", cost: "$30" },
    ],
    international: [
      { method: "Standard International", days: "10-15", cost: "$25" },
      { method: "Express International", days: "5-7", cost: "$50" },
      { method: "Priority International", days: "2-3", cost: "$100" },
    ],
  };

  const shippingRegions = [
    { code: "us", name: "United States", description: "Free shipping on orders over $50" },
    { code: "ca", name: "Canada", description: "Available for most items" },
    { code: "uk", name: "United Kingdom", description: "Available for most items" },
    { code: "eu", name: "Europe", description: "Available for most items" },
    { code: "au", name: "Australia", description: "Available for most items" },
  ];

  const faqs = [
    {
      question: "How do I know when my order will arrive?",
      answer: "After placing your order, you'll receive a confirmation email with tracking information. You can track your shipment using the provided tracking number.",
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free standard shipping on orders over $50 to the United States. Some restrictions may apply.",
    },
    {
      question: "Can I change my delivery address after ordering?",
      answer: "If your order hasn't shipped yet, contact us immediately at shipping@fresco.com with your order number and new address.",
    },
    {
      question: "What happens if my package is lost?",
      answer: "We provide tracking for all shipments. If your package is lost, contact us within 30 days with your tracking number, and we'll investigate and resolve the issue.",
    },
    {
      question: "Do you ship to PO boxes?",
      answer: "We ship to most PO boxes for standard shipping. Some express services may not be available to PO boxes.",
    },
  ];

  return (
    <div className="shipping-info-container" style={{width:'100vw'}}>
      <div className="shipping-info-content">
        <h1>Shipping Information</h1>
        <p className="intro-text">
          We ship worldwide and offer multiple shipping options to meet your needs.
        </p>

        <section className="shipping-section">
          <h2>Shipping Options</h2>
          
          <div className="shipping-tabs">
            <button
              className={`tab-btn ${activeCountry === "us" ? "active" : ""}`}
              onClick={() => setActiveCountry("us")}
            >
              Domestic (USA)
            </button>
            <button
              className={`tab-btn ${activeCountry === "international" ? "active" : ""}`}
              onClick={() => setActiveCountry("international")}
            >
              International
            </button>
          </div>

          <div className="shipping-options">
            {shippingOptions[activeCountry].map((option, index) => (
              <div key={index} className="shipping-option">
                <div className="option-header">
                  <h3>{option.method}</h3>
                  <span className="option-cost">{option.cost}</span>
                </div>
                <p className="delivery-time">📅 Delivery: {option.days} business days</p>
              </div>
            ))}
          </div>
        </section>

        <section className="shipping-section">
          <h2>We Ship To</h2>
          <div className="regions-grid">
            {shippingRegions.map((region) => (
              <div key={region.code} className="region-card">
                <h3>{region.name}</h3>
                <p>{region.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="shipping-section">
          <h2>Shipping Policies</h2>
          <div className="policies-list">
            <div className="policy-item">
              <span className="policy-icon">🔍</span>
              <div>
                <h3>Order Tracking</h3>
                <p>All orders come with free tracking. You'll receive updates via email as your package moves through our system.</p>
              </div>
            </div>
            <div className="policy-item">
              <span className="policy-icon">📦</span>
              <div>
                <h3>Safe Packaging</h3>
                <p>We carefully pack every order to ensure your items arrive in perfect condition. We use quality materials and protective padding.</p>
              </div>
            </div>
            <div className="policy-item">
              <span className="policy-icon">💳</span>
              <div>
                <h3>Customs & Duties</h3>
                <p>International customers may be responsible for customs duties and taxes. These will be collected by the carrier upon delivery.</p>
              </div>
            </div>
            <div className="policy-item">
              <span className="policy-icon">⚡</span>
              <div>
                <h3>Processing Time</h3>
                <p>Orders typically process within 1-2 business days. Processing time does not include shipping time.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="shipping-section faq-section">
          <h2>Shipping FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-detail">
                <summary className="faq-question">{faq.question}</summary>
                <p className="faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="shipping-section contact-section">
          <h2>Need Shipping Help?</h2>
          <p>Contact our shipping team for any questions:</p>
          <p className="contact-email">📧 shipping@fresco.com</p>
          <p className="contact-phone">📱 +1 (555) 123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default ShippingInfo;
