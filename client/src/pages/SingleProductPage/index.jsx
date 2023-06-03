import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Message from "../../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";
import Loading from "../../components/LoadingError/Loading";
import { useNavigate, useParams } from "react-router-dom";


const SingleProductPage = () => {
  const [qtd, setQtd] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qtd=${qtd}`);
  };
  
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Preço</h6>
                      <span>R${product.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.countInStock > 0 ? (
                        <span>Em estoque</span>
                      ) : (
                        <span>Indisponível</span>
                      )}
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantidade</h6>
                          <select value={qtd} onChange={(e) => setQtd(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(
                              (idx) => (
                                <option key={idx + 1} value={idx + 1}>
                                  {idx + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button onClick={AddToCartHandle} className="round-black-btn">Adicionar ao carrinho</button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProductPage;
