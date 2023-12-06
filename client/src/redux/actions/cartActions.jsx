import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CALCULAR_FRETE_FAIL,
  CALCULAR_FRETE_REQUEST,
  CALCULAR_FRETE_SUCCESS
} from "../constants/cartConstants";

export const addToCart = (id, qtd) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://e-commerce-automotivo-server.vercel.app/api/products/${id}`);

  console.log(data);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      weight: data.weight,
      qtd,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removefromcart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const saveShippingAddress = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(getState().cart.shippingAddress));
};


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const calcularFrete = () => async(dispatch) => {
  try {
    dispatch({ type: CALCULAR_FRETE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const cepDestino = JSON.parse(localStorage.getItem("shippingAddress")).postalCode;

    let pesoProduto = 0;
    JSON.parse(localStorage.getItem("cartItems").map((x) => pesoProduto += x.product.qtd * x.product.weight));

    console.log(cepDestino, pesoProduto);

    const { data } = await axios.post(
      `https://e-commerce-automotivo-server.vercel.app/api/correios/frete`,
      {cepDestino, pesoProduto},
      config
    );

    console.log(data);

    dispatch({ type: CALCULAR_FRETE_SUCCESS, payload: data });

    localStorage.setItem("frete", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CALCULAR_FRETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
