import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { states } from "../../components/StateComponent";
import { saveWareHouseAddress } from "../../redux/actions/wareHouseActions";

const AddWareHouse = () => {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [complement, setComplement] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveWareHouseAddress(address, number, city, state, postalCode, complement));
        navigate("/");
    };

    return (
      <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
          <Link to="/" className="btn btn-danger text-white">Voltar</Link>
            <h2 className="content-title">Adicionar local</h2>
            <div>
              <button type="submit" className="btn btn-primary">Adicionar</button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="warehouse_address" className="form-label">Endereço</label>
                    <input type="text" placeholder="Endereço" className="form-control" id="warehouse_address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="warehouse_number" className="form-label">Numero</label>
                    <input type="number" placeholder="Numero" className="form-control" id="warehouse_address" required value={number} onChange={(e) => setNumber(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="warehouse_city" className="form-label">Cidade</label>
                    <input type="text" placeholder="Cidade" className="form-control" id="warehouse_city" required value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="warehouse_state" className="form-label">Estado</label>
                    <div className="LoginDiv">
                        <ComboBoxComponent placeholder="Estado" dataSource={states} value={state}
                        onChange={(e) => setState(e.target.value)}></ComboBoxComponent>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="warehouse_postalcode" className="form-label">CEP</label>
                    <input type="text" placeholder="CEP" className="form-control" id="warehouse_postalcode" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="warehouse_complement" className="form-label">Complemento</label>
                    <input type="text" placeholder="Complemento" className="form-control" id="warehouse_complement" required value={complement} onChange={(e) => setComplement(e.target.value)} />
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

export default AddWareHouse;