import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../../redux/actions/cartActions";

const CartPage = () => {
  window.scrollTo(0, 0);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const location = useLocation();

  const qtd = location.search ? Number(location.search.split("=")[1]) : 1;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  //const total = cartItems.reduce((a, i) => a + i.qtd * i.price, 0).toFixed(2);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qtd));
    }
  }, [dispatch, id, qtd]);

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Seu carrinho está vazio
            <Link className="btn btn-success mx-5 px-5 py-3" to="/" style={{ fontSize: "12px" }}>
              Continue comprando
            </Link>
          </div>
        ) : ( */}
          <>
            <div className=" alert alert-info text-center mt-3">
              Total de itens
              <Link className="text-success mx-2" to="/cart">
                ({/*cartItems.length*/0})
              </Link>
            </div>
            {/* {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <div className="cart-iterm row">
                  <div
                    onClick={() => removeFromCartHandle(item.product)}
                    className="remove-button d-flex justify-content-center align-items-center"
                  >
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="cart-image col-md-3">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-text col-md-5 d-flex align-items-center">
                    <Link to={`/products/${item.product}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                    <h6>Quantidade</h6>
                    <select value={item.qtd} onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                    <h6>Preço</h6>
                    <h4>R${item.price}</h4>
                  </div>
                </div>
              </React.Fragment>
            ))} */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">R${43.53}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continuar comprando</button>
              </Link>
              {43.53 > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Finalizar pedido</button>
                </div>  
              )}
            </div>
          </>
        
      </div>
    </>
  );
};

export default CartPage;
