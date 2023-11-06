import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img src="/images/logo.png" style={{ height: "46" }} className="logo" alt="Ecommerce dashboard template" />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>
        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/" exact={true} >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/products/1">
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Produtos</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/addproduct">
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Adicionar Produto</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/users/1">
                <i className="icon fas fa-user"></i>
                <span className="text">Usuários</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/adduser">
                <i className="icon fas fa-user"></i>
                <span className="text">Adicionar Usuário</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/addWarehouse">
                <i className="icon fas fa-warehouse"></i>
                <span className="text">Adicionar Local</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
