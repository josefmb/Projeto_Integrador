import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import StateComponent from "../../components/StateComponent";
import { editWarehouseAddress, saveWareHouseAddress } from "../../redux/actions/wareHouseActions";
import Toast from "../LoadingError/Toast";
import { WAREHOUSE_UPDATE_RESET } from "../../redux/constants/warehouseConstants";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';

const AddWareHouse = () => {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [complement, setComplement] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editWarehouse = useSelector((state) => state.warehouseEdit);
    const { loading, error, warehouse } = editWarehouse;

    const addressUpdate = useSelector((state) => state.warehouseUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = addressUpdate;

    useEffect(() => {
      if (successUpdate) {
        dispatch({ type: WAREHOUSE_UPDATE_RESET });
        alert("Local Atualizado");
      } else {
        if (!warehouse.address) {
          dispatch(editWarehouseAddress());
        }
          setAddress(warehouse.address);
          setNumber(warehouse.number);
          setCity(warehouse.city);
          setState(warehouse.state);
          setPostalCode(warehouse.postalCode);
          setComplement(warehouse.complement);
        }
    }, [warehouse, dispatch, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(address, number, city, state, postalCode, complement);
        dispatch(saveWareHouseAddress(address, number, city, state, postalCode, complement));
        navigate("/");
    };

    return (
      <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
          <Link to="/" className="btn btn-danger text-white">Voltar</Link>
            <h2 className="content-title">Local de Armazenagem</h2>
            <div>
              <button type="submit" className="btn btn-primary">Alterar</button>
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DropdownButton id="dropdown-basic-button" title="Estados" onSelect={(e) => setState(e)}>
                      <Dropdown.Item eventKey="AC">AC</Dropdown.Item>
                      <Dropdown.Item eventKey="AL">AL</Dropdown.Item>
                      <Dropdown.Item eventKey="AM">AM</Dropdown.Item>
                      <Dropdown.Item eventKey="AP">AP</Dropdown.Item>
                      <Dropdown.Item eventKey="BA">BA</Dropdown.Item>
                      <Dropdown.Item eventKey="CE">CE</Dropdown.Item>
                      <Dropdown.Item eventKey="DF">DF</Dropdown.Item>
                      <Dropdown.Item eventKey="ES">ES</Dropdown.Item>
                      <Dropdown.Item eventKey="GO">GO</Dropdown.Item>
                      <Dropdown.Item eventKey="MA">MA</Dropdown.Item>
                      <Dropdown.Item eventKey="MT">MT</Dropdown.Item>
                      <Dropdown.Item eventKey="MS">MS</Dropdown.Item>
                      <Dropdown.Item eventKey="MG">MG</Dropdown.Item>
                      <Dropdown.Item eventKey="PA">PA</Dropdown.Item>
                      <Dropdown.Item eventKey="PB">PB</Dropdown.Item>
                      <Dropdown.Item eventKey="PE">PE</Dropdown.Item>
                      <Dropdown.Item eventKey="PI">PI</Dropdown.Item>
                      <Dropdown.Item eventKey="PR">PR</Dropdown.Item>
                      <Dropdown.Item eventKey="RJ">RJ</Dropdown.Item>
                      <Dropdown.Item eventKey="RN">RN</Dropdown.Item>
                      <Dropdown.Item eventKey="RO">RO</Dropdown.Item>
                      <Dropdown.Item eventKey="RS">RS</Dropdown.Item>
                      <Dropdown.Item eventKey="RR">RR</Dropdown.Item>
                      <Dropdown.Item eventKey="SC">SC</Dropdown.Item>
                      <Dropdown.Item eventKey="SE">SE</Dropdown.Item>
                      <Dropdown.Item eventKey="SP">SP</Dropdown.Item>
                      <Dropdown.Item eventKey="TO">TO</Dropdown.Item>
                    </DropdownButton> 
                    {/* <StateComponent onChange={(e) => setState(e.target.value)}/> */}
                    <input type="text" placeholder="Estado" className="form-control" value={state} readOnly/>
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