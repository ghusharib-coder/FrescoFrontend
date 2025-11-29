import React from 'react';

const About = () => {
  return (
    <div className='About' style={{ padding: '2rem', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#4B0082', marginBottom: '1rem' }}>About Us</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        Welcome to <strong>MyStore</strong> – your one-stop destination for trendy, high-quality products that suit your lifestyle. 
        At FRESCO, we believe in delivering not just products but a complete shopping experience that is convenient, enjoyable, and reliable.
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        Our journey started with a simple idea: to make online shopping easy and stress-free for everyone. Today, 
        we proudly serve thousands of happy customers, offering products that blend style, comfort, and affordability.
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        We carefully curate our collection to ensure every product meets the highest standards of quality. 
        From everyday essentials to the latest trends, you’ll find everything you need in one place.
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        Thank you for choosing <strong>FRESCO</strong>. Your trust means everything to us. 
        We promise to keep working hard to bring you the best shopping experience possible.
      </p>
    </div>
  );
};

export default About;
