import React from "react";
import "./ReturnsExchange.css";

const ReturnsExchange = () => {
  const returnSteps = [
    {
      step: 1,
      title: "Request Return",
      description: "Log into your account and request a return within 30 days of purchase.",
    },
    {
      step: 2,
      title: "Get Return Label",
      description: "Receive a prepaid return shipping label via email.",
    },
    {
      step: 3,
      title: "Ship Item",
      description: "Package the item securely and ship it back using the provided label.",
    },
    {
      step: 4,
      title: "Receive Refund",
      description: "Once we receive and inspect the item, your refund will be processed within 5-7 business days.",
    },
  ];

  const conditions = [
    "Item must be unused and in original condition",
    "All original packaging and tags must be included",
    "Return must be initiated within 30 days of purchase",
    "Proof of purchase (order number/receipt) required",
    "Items must not show signs of wear or damage",
  ];

  const exchanges = [
    "Same item in different size or color",
    "Item of similar or equal value",
    "Defective or damaged items",
  ];

  return (
    <div className="returns-exchange-container" style={{width:'100vw'}}>
      <div className="returns-exchange-content">
        <h1 style={{color:'white'}}>Returns & Exchange Policy</h1>
        <p className="intro-text"style={{color:'white'}}>
          We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
        </p>

        <section className="policy-section">
          <h2>Return Process</h2>
          <div className="steps-container">
            {returnSteps.map((step) => (
              <div key={step.step} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3 style={{color:'white'}}>{step.title}</h3>
                  <p style={{color:'white'}}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="policy-section">
          <h2>Return Conditions</h2>
          <div className="conditions-list">
            {conditions.map((condition, index) => (
              <div key={index} className="condition-item">
                <span className="condition-icon">✓</span>
                <p>{condition}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="policy-section">
          <h2>Exchange Policy</h2>
          <p>We offer exchanges for:</p>
          <div className="exchanges-list">
            {exchanges.map((exchange, index) => (
              <div key={index} className="exchange-item">
                <span className="exchange-icon">↔</span>
                <p>{exchange}</p>
              </div>
            ))}
          </div>
          <p className="exchange-note">
            Exchanges are processed free of charge. You'll receive a prepaid return label.
          </p>
        </section>

        <section className="policy-section refund-info">
          <h2>Refund Timeline</h2>
          <div className="refund-grid">
            <div className="refund-item">
              <h3>Processing</h3>
              <p>5-7 business days after receipt</p>
            </div>
            <div className="refund-item">
              <h3>Bank Transfer</h3>
              <p>3-5 business days to appear</p>
            </div>
            <div className="refund-item">
              <h3>Card Refund</h3>
              <p>May take up to 10 business days</p>
            </div>
          </div>
        </section>

        <section className="policy-section non-returnable">
          <h2>Non-Returnable Items</h2>
          <ul>
            <li>Items purchased on final sale</li>
            <li>Clearance items marked as non-returnable</li>
            <li>Items without original tags or heavily used</li>
            <li>Items damaged due to customer misuse</li>
          </ul>
        </section>

        <section className="policy-section contact-support">
          <h2 style={{color:'white'}}>Questions About Returns?</h2>
          <p style={{color:'white'}}>Contact our support team for assistance:</p>
          <p style={{color:'white'}} className="contact-email">📧 returns@fresco.com</p>
          <p style={{color:'white'}} className="contact-phone">📱 +1 (555) 123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default ReturnsExchange;
