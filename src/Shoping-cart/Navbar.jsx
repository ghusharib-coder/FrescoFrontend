import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const items = useSelector((state) => state.cart.products);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">FRESCO Store</div>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="Home" onClick={() => setMenuOpen(false)} style={{fontSize:'1.25rem',marginLeft:'2rem'}}>Home</Link>
        <Link to="Cart" onClick={() => setMenuOpen(false)} style={{fontSize:'1.25rem',marginLeft:'2rem'}}>Cart</Link>
        <Link to="About" onClick={() => setMenuOpen(false)} style={{fontSize:'1.25rem',marginLeft:'2rem'}}>About</Link>
        <Link to="Contact" onClick={() => setMenuOpen(false)} style={{fontSize:'1.25rem',marginLeft:'2rem'}}>Contact</Link>
      </div>

      <div className="cart-info" style={{fontSize:'1.25rem',marginLeft:'1rem'}}>Cart Items: {items.length}</div>
    </nav>
  );
};

export default Navbar;
