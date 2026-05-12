import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container" style={{width:'100vw'}}>
      <div className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: May 2026</p>

        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            At Fresco Store ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your personal information when you use our website and services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in various ways, including:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information when you create an account or make a purchase.</li>
            <li><strong>Device Information:</strong> Browser type, IP address, device type, and operating system.</li>
            <li><strong>Usage Information:</strong> Pages visited, items viewed, search queries, and time spent on our website.</li>
            <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to enhance your experience.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your orders and send order confirmations</li>
            <li>Provide customer service and support</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal obligations</li>
            <li>Analyze trends and user behavior</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Payment processors, shipping carriers, and email service providers.</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
            <li><strong>Business Partners:</strong> With your consent for promotional purposes.</li>
            <li><strong>Third-Party Analytics:</strong> To understand how you use our services.</li>
          </ul>
          <p>We do not sell or rent your personal information to third parties for their marketing purposes.</p>
        </section>

        <section className="policy-section">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at privacy@fresco.com</p>
        </section>

        <section className="policy-section">
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies to enhance your experience and track your preferences. You can control cookie settings in your browser. Please note that disabling cookies may affect website functionality.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. We encourage you to review their privacy policies before providing any information.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13 years old. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will delete such information promptly.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. International Data Transfer</h2>
          <p>
            If you are located outside the United States, your information may be transferred to, stored in, and processed in countries other than your country of residence. By using our services, you consent to such transfer.
          </p>
        </section>

        <section className="policy-section">
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
          </p>
        </section>

        <section className="policy-section">
          <h2>12. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us:</p>
          <div className="contact-info">
            <p>
              <strong>Email:</strong> privacy@fresco.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Mailing Address:</strong><br />
              Fresco Store<br />
              123 Shopping Street<br />
              Commerce City, CC 12345<br />
              United States
            </p>
          </div>
        </section>

        <section className="policy-section disclaimer">
          <p>
            By using Fresco Store, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
