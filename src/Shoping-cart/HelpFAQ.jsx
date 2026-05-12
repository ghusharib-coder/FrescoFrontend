import React, { useState } from "react";
import "./HelpFAQ.css";

const HelpFAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. Enter your shipping and payment information, then confirm your order.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payment methods.",
    },
    {
      id: 3,
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you'll receive a tracking number via email. Use this number to track your shipment on our website or the carrier's site.",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in original packaging. Visit our Returns & Exchange page for more details.",
    },
    {
      id: 5,
      question: "Do you ship internationally?",
      answer: "Yes, we ship to selected countries. Shipping costs and delivery times vary based on location. Check our Shipping Info page for details.",
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "You can reach our support team via email at support@fresco.com or through the contact form on our website.",
    },
  ];

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="help-faq-container" style={{width:'100vw'}}>
      <div className="help-faq-content">
        <h1>Help & FAQ</h1>
        <p className="help-intro">Find answers to frequently asked questions about our products and services.</p>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${activeId === faq.id ? "active" : ""}`}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="faq-icon">{activeId === faq.id ? "−" : "+"}</span>
                  <span className="faq-text">{faq.question}</span>
                </button>
                {activeId === faq.id && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2>Need More Help?</h2>
          <p>Couldn't find what you're looking for? Contact our support team:</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>support@fresco.com</p>
            </div>
            <div className="contact-item">
              <h3>📱 Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>⏰ Hours</h3>
              <p>Mon - Fri: 9AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;
