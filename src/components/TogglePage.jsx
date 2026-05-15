import React, { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const TogglePage = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  return (
    <div className="container">
      <p style={{ fontSize: '2.5rem', marginBottom: '1rem',color:'white',fontWeight:'bold' }}>🛍️ FRESCO Store</p>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem', opacity: 0.9 }}>Welcome to your shopping paradise</p>
      <div className="Form">
        <div className="Form-buttons">
          <button 
            className={LoggedIn?"active":""} 
            onClick={() => setLoggedIn(true)}
          >
            🔐 Log In
          </button>
          <button 
            className={!LoggedIn?"active":""} 
            onClick={() => setLoggedIn(false)}
          >
            ✨ Sign Up
          </button>
        </div>
        {LoggedIn ? <LogIn /> : <SignUp switchToLogin={()=>setLoggedIn(true)}/>}
      </div>
    </div>
  );
};

export default TogglePage;
