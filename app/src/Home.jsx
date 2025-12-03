import React from "react";
import Navbar from "./Navbar";
import image from "./assets/logo.png";

function Home() {
  return (
      <div className="home-container">
        <Navbar />
        <div className="home-0">
          <div className="home-1">
            <h1>ShadowVault:</h1>
            <h2>AI-Powered Cyber Threat Defense on Blockchain</h2>
            <h3>Fortifying Cybersecurity with AI Precision and Blockchain Integrity</h3>
          </div>
          <div className="home-2">
          <img className="image" src={image} alt="Logo" />
          </div>
        </div>
      </div>
  );
}

export default Home;
