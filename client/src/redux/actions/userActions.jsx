import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_PIN_REQUEST,
  USER_VERIFY_PIN_SUCCESS,
  USER_VERIFY_PIN_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_CREATE_ADRESS_REQUEST,
  USER_CREATE_ADRESS_SUCCESS,
  USER_CREATE_ADRESS_FAIL,
  USER_GET_DEFAULT_ADDRESS_FAIL,
  USER_GET_DEFAULT_ADDRESS_REQUEST,
  USER_GET_DEFAULT_ADDRESS_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://e-commerce-automotivo-server.vercel.app/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userDefaultAddress");

  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};


export const verifyEmail = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_PIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `https://e-commerce-automotivo-server.vercel.app/api/users/${id}/verify/${token}`,
      config
    );

    dispatch({ type: USER_VERIFY_PIN_SUCCESS, payload: data });

    localStorage.setItem("userVerifyingPin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_VERIFY_PIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://e-commerce-automotivo-server.vercel.app/api/users`,
      { name, email, password },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`https://e-commerce-automotivo-server.vercel.app/api/users/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Não autorizado, sem token") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`https://e-commerce-automotivo-server.vercel.app/api/users/profile`, user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Não autorizado, sem token") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};


export const saveDefaultAddress = (id, address, number, city, state, postalCode, complement) => async(dispatch) => {
  try {
    dispatch({ type: USER_CREATE_ADRESS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://e-commerce-automotivo-server.vercel.app/api/users/${id}/address`,
      { address, number, city, state, postalCode, complement },
      config
    );
    dispatch({ type: USER_CREATE_ADRESS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_CREATE_ADRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDefaultAddress = (id) => async(dispatch) => {
  try {
    dispatch({ type: USER_GET_DEFAULT_ADDRESS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`https://e-commerce-automotivo-server.vercel.app/api/users/${id}/defaultAddress`, config);

    localStorage.setItem("userDefaultAddress", JSON.stringify(data));

    dispatch({ type: USER_GET_DEFAULT_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_GET_DEFAULT_ADDRESS_FAIL,
      payload: message,
    });
  }
}
