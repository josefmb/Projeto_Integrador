import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
    window.scrollTo(0, 0);

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode }));
        navigate("/payment");
    };

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler} >
                    <h6>Endereço de Entrega</h6>
                    <input type="text" placeholder="Endereço" value={address} required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input type="text" placeholder="Cidade" value={city} required
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input type="text" placeholder="CEP" value={postalCode} required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <button type="submit">Continuar</button>
                </form>
            </div>
        </>
    );
};

export default ShippingPage;