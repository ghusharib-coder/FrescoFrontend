import React, { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const TogglePage = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  return (
    <div className="container">
      <h1>FRESCO Store</h1>
      <div className="Form">
        <div className="Form-buttons">
          <button className={LoggedIn?"active":""} onClick={() => setLoggedIn(true)}>Log-In</button>
          <button className={!LoggedIn?"active":""} onClick={() => setLoggedIn(false)}>Sign-Up </button>
        </div>
        {LoggedIn ? <LogIn /> : <SignUp switchToLogin={()=>setLoggedIn(true)}/>}
      </div>
    </div>
  );
};

export default TogglePage;
