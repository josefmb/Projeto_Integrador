import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";
import { createProduct } from "../../redux/actions/productActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/error";
import Loading from "../LoadingError/loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Produto adicionado", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setWeight(0);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, price, description, image, countInStock, weight));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products/1" className="btn btn-danger text-white">Produtos</Link>
            <h2 className="content-title">Adicionar produto</h2>
            <div>
              <button type="submit" className="btn btn-primary">Adicionar</button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">Nome do Produto</label>
                    <input type="text" placeholder="Nome" className="form-control" id="product_title" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">Valor</label>
                    <input type="number" placeholder="Valor" className="form-control" id="product_price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_weight" className="form-label">Peso(g)</label>
                    <input type="number" placeholder="Peso" className="form-control" id="product_weight" required value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_quantity" className="form-label">Quantidade em Estoque</label>
                    <input type="number" placeholder="Quantidade" className="form-control" id="product_quantity" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Descrição</label>
                    <textarea placeholder="Descrição" className="form-control" rows="7" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Imagens</label>
                    <input className="form-control" type="text" placeholder="URL da imagem" value={image} required onChange={(e) => setImage(e.target.value)} />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
