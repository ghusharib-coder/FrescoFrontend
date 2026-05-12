import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessagePopup } from './Popup';
import ReactDOM from "react-dom";
const Contact = () => {
  const [ShowPopup, setShowPopup] = useState(false);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    const OnSubmit=()=>{
       setShowPopup(true);
       setTimeout(() => setShowPopup(false), 1000);
      reset();
    }
  return (
    <div className='Contact' style={{width:'100vw'}}>
      <h1>📞 Contact Us</h1>
      <p>
        We’d love to hear from you! Whether you have questions about our products, need assistance with your order, 
        or simply want to share your feedback, our team is here to help.
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          📍 <strong>Address:</strong> 123 Fashion Street, Your City, Country
        </p>
        <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          📞 <strong>Phone:</strong> +123 456 789
        </p>
        <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          📧 <strong>Email:</strong> support@FRESCO.com
        </p>
      </div>
      <p>
        Or fill out the form below and we'll get back to you as soon as possible:
      </p>
      
       <form onSubmit={handleSubmit(OnSubmit)} className="messageForm">
        <input
          placeholder="Enter Name"
          {...register("name", {
            required: "Enter name",
            minLength: { value: 3, message: "Atleast 3 letters required" },
          })}
        />
        {errors.name && (
          <p style={{ margin: "0", fontSize: "14px",color:"red"}}>{errors.name.message}</p>
        )}
        <input
          placeholder="Enter Email"
          {...register("Email",{ 
            required: "Email is required",
          })}
        />
         {errors.email && (
          <p style={{ margin: "0", fontSize: "14px",color:"red"}}>{errors.email.message}</p>
        )}
         <textarea placeholder="Your Message" rows="5" style={{ padding: '0.8rem', fontSize: '1rem',}}></textarea>
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit"
        style={{ padding: '0.8rem', backgroundColor: '#4B0082', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          submit
        </button>
      </form>
      {ShowPopup &&
            ReactDOM.createPortal(
              <MessagePopup/>,
              document.getElementById("new-root")
            )}{" "}
    </div>
  );
};

export default Contact;
