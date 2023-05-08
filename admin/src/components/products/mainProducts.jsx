import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "./products";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import Loading from "../LoadingError/loading";
import Message from "../LoadingError/error";
import Pagination from "./Pagination";

const MainProducts = () => {
  const { pageNumber } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Produtos</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">Novo produto</Link>
        </div>
      </div>
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input type="search" placeholder="Pesquisar..." className="form-control p-2" />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tudo</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Último adicionado</option>
                <option>Menor preço</option>
                <option>Mais visto</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}
          <Pagination pages={pages} page={page} />
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
