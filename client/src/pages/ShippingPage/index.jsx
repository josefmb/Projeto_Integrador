import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { saveShippingAddress, calcularFrete } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { getDefaultAddress } from "../../redux/actions/userActions";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { states } from "../../components/StateComponent";

const ShippingPage = () => {
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
        dispatch(saveShippingAddress({ address, number, city, state, postalCode, complement }));
        //dispatch(calcularFrete());

        navigate("/payment");
    };

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler} >
                    <h6>Endereço de Entrega</h6>
                    <input type="text" placeholder="Endereço" value={address} required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input type="number" placeholder="Número" value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <input type="text" placeholder="Cidade" value={city} required
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <div className="LoginDiv">
                        <ComboBoxComponent placeholder="Estado" dataSource={states} value={state}
                        onChange={(e) => setState(e.target.value)}></ComboBoxComponent>
                    </div>
                    <input type="text" placeholder="CEP" value={postalCode} required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <input type="text" placeholder="Complemento" value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                    />
                    <button type="submit">Continuar</button>
                </form>
            </div>
        </>
    );
};

export default ShippingPage;