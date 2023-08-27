import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { removefromcart } from "../redux/actions/cartActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let items = localStorage.cartItems ? JSON.parse(localStorage.cartItems) : 0;

  const removeCarts = () => {
    cartItems.forEach(element => {
      dispatch(removefromcart(element.product));
    });
  }

  const logoutHandler = () => {
    removeCarts();
    dispatch(logout());
  };

  return (
    <div>
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+55 47 0022-8922 </p>
              <p>produtos@automotivos.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to=""><i className="fab fa-facebook-f"></i></Link>
              <Link to=""><i className="fab fa-instagram"></i></Link>
              <Link to=""><i className="fab fa-linkedin-in"></i></Link>
              <Link to=""><i className="fab fa-youtube"></i></Link>
              <Link to=""><i className="fab fa-pinterest-p"></i></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group">
                  <input type="search" className="form-control rounded search" placeholder="Pesquisar" />
                  <button type="submit" className="search-button">Pesquisar</button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
              {userInfo ? (
                  <div className="btn-group">
                    <button type="button" className="name-button dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Olá, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">Perfil</Link>
                      <Link className="dropdown-item" to="/adress">Endereço</Link>
                      <Link className="dropdown-item" to="/login" onClick={logoutHandler}>Sair</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Cadastrar</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}
                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  {items.length > 0 && (
                    <span className="badge">{items.length}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
