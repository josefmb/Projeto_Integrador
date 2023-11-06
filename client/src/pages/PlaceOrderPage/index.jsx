import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Message from "../../components/LoadingError/Error";

const PlaceOrderPage = () => {
  window.scrollTo(0, 0);

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.shippingPrice = localStorage.getItem("frete") ? 
                       JSON.parse(localStorage.getItem("frete")).valorpac != null ? JSON.parse(localStorage.getItem("frete")).valorpac.replace(',', '.') 
                       : 22.53
                       : 22.53;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const placeOrderHandler = () => {
    navigate("/paymentQRCode");
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qtd, 0));
  cart.totalPrice = addDecimals(parseFloat(cart.itemsPrice) + parseFloat(cart.shippingPrice));

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Cliente</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Informações do pedido</strong>
                </h5>
                <p>Endereço de entrega: <br/>{cart.shippingAddress.address}</p>
                <p>Forma de pagamento: <br/>{cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Entregar em:</strong>
                </h5>
                <p>
                  {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Seu carrinho está vazio</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Quantidade</h4>
                      <h6>{item.qtd}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>Subtotal</h4>
                      <h6>R${item.qtd * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Produtos</strong>
                  </td>
                  <td>R${cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Frete</strong>
                  </td>
                  <td>R${cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>R${cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>Confirmar pedido</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
