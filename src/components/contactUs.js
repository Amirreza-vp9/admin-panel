import React from "react";
import "../styles/contactUs.css";

const ContactUs = () => {
  return (
    <div className="contactUs">
      <div className="contact">
        <h2>تماس با ما</h2>
        <div className="col">
          <div>تلفن پشتیبانی:</div>
          <div>021-91039000</div>
        </div>
        <div className="col">
          <div>فکس:</div>
          <div>021-89774788</div>
        </div>
        <div className="col">
          <div>پست الکترونیکی:</div>
          <div>info@tour.cab</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
