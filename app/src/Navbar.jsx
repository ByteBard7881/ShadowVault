import React from "react";
import { Link } from "react-router-dom";
import "./App.css"

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/packet">Packet</Link>
      <Link className="link" to="/malicious">Malicious</Link>
    </div>
  );
};

export default Navbar;
