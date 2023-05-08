import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex">
        <div className="card-name">
          <img alt="mastercard" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" />
        </div>
        <div className="card-name">
          <img alt="visa" src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          />
        </div>
        <div className="card-name">
          <img alt="elo" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Elo_logo.png" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
