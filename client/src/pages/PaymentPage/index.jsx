import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Pix");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form className="Login2 col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <h6>Selecione a forma de pagamento</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input className="form-check-input" type="radio" value={paymentMethod} checked="true" disabled="true"
                onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label">Pix</label>
            </div>
          </div>
          <button type="submit">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;
