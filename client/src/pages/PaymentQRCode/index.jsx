import React from "react";
import Header from "../../components/Header";

const PaymentQRCode = () => {
  window.scrollTo(0, 0);

  return (
    <>
        <Header />
        <h6 className="QRCode_title">QR Code</h6>
        <div className="container d-flex justify-content-center align-items-center login-center">
            <img src="/images/QRCode.png" alt="QRCode" />
        </div>
    </>
  );
};

export default PaymentQRCode;
