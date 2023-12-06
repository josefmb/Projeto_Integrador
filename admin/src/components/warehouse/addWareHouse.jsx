import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { editWarehouseAddress, saveWareHouseAddress } from "../../redux/actions/wareHouseActions";
import Toast from "../LoadingError/Toast";
import { WAREHOUSE_UPDATE_RESET } from "../../redux/constants/warehouseConstants";

import Select from 'react-select';

const ufOptions = [
    { value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' },
    { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' },
    { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' },
    { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' },
  ];

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
        dispatch(saveWareHouseAddress(address, number, city, state, postalCode, complement));
        navigate("/");
    };

    const handleChangeSelect = (e) => {
      setState(e);
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
                      <Select options={ufOptions} value={state} className="LoginSelect" placeholder="UF" onChange={handleChangeSelect}></Select>
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