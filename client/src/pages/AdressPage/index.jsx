import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import { getDefaultAddress, saveDefaultAddress } from "../../redux/actions/userActions";

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

const AdressPage = () => {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [complement, setComplement] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDefaultAddress(userInfo._id, address, number, city, state, postalCode, complement));
        dispatch(getDefaultAddress(userInfo._id));
        navigate("/");
    };

    const userDefaultAddress = useSelector((state) => state.userDefaultAddress);
    const { defaultAddress } = userDefaultAddress; 

    useEffect(() => {

        const setDefaultAddress = () => {
            try {
                dispatch(getDefaultAddress(userInfo._id));
                
                if (defaultAddress) {
                    setAddress(defaultAddress.address);
                    setNumber(defaultAddress.number);
                    setCity(defaultAddress.city);
                    setState(defaultAddress.state);
                    setPostalCode(defaultAddress.postalCode);
                    setComplement(defaultAddress.complement);
                }
            } catch (error) {
                setAddress("");
                setNumber(0);
                setCity("");
                setState("");
                setPostalCode("");
                setComplement("");
            }
        };

        setDefaultAddress();

    }, []);

    const handleChangeSelect = (e) => {
        setState(e);
      };

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler} >
                    <h6>Endereço de Entrega Padrão</h6>
                    <input type="text" placeholder="Endereço" value={address} required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input type="number" placeholder="Número" value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <input type="text" placeholder="Cidade" value={city} required
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <div className="mb-4">
                        <Select options={ufOptions} value={state} className="LoginSelect" placeholder="UF" onChange={handleChangeSelect}></Select>
                    </div>
                    <input type="text" placeholder="CEP" value={postalCode} required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <input type="text" placeholder="Complemento" value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </>
    );
};

export default AdressPage;