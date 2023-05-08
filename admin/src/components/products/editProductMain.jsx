import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "../../redux/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/error";
import Loading from "../LoadingError/loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Produto Atualizado", ToastObjects);
    } else {
      if (!product.name || product._id !== id) {
        dispatch(editProduct(id));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
      }
    }
  }, [product, dispatch, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        description,
        image,
        countInStock,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products/1" className="btn btn-danger text-white">Produtos</Link>
            <h2 className="content-title">Atualizar produto</h2>
            <div>
              <button type="submit" className="btn btn-primary">Atualizar</button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">Nome</label>
                        <input type="text" placeholder="Nome:" className="form-control" id="product_title" required value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">Valor </label>
                        <input type="number" placeholder="Valor:" className="form-control" id="product_price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">Quantidade em Estoque</label>
                        <input type="number" placeholder="Quantidade:" className="form-control" id="product_price" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Descrição</label>
                        <textarea placeholder="Descrição" className="form-control" rows="7" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Imagem</label>
                        <input className="form-control" type="text" value={image} required onChange={(e) => setImage(e.target.value)} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
