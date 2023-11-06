import {
    WAREHOUSE_CREATE_FAIL,
    WAREHOUSE_CREATE_REQUEST,
    WAREHOUSE_CREATE_RESET,
    WAREHOUSE_CREATE_SUCCESS,
    WAREHOUSE_EDIT_FAIL,
    WAREHOUSE_EDIT_REQUEST,
    WAREHOUSE_EDIT_SUCCESS,
    WAREHOUSE_UPDATE_FAIL,
    WAREHOUSE_UPDATE_REQUEST,
    WAREHOUSE_UPDATE_RESET,
    WAREHOUSE_UPDATE_SUCCESS,
} from "../constants/warehouseConstants";
  

export const warehouseCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case WAREHOUSE_CREATE_REQUEST:
        return { loading: true };
      case WAREHOUSE_CREATE_SUCCESS:
        return { loading: false, success: true, warehouse: action.payload };
      case WAREHOUSE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case WAREHOUSE_CREATE_RESET:      return {};
      default:
        return state;
    }
};
  

export const warehouseEditReducer = (
    state = { warehouse: {} },
    action
  ) => {
    switch (action.type) {
      case WAREHOUSE_EDIT_REQUEST:
        return { ...state, loading: true };
      case WAREHOUSE_EDIT_SUCCESS:
        return { loading: false, warehouse: action.payload };
      case WAREHOUSE_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};
  

export const warehouseUpdateReducer = (state = { warehouse: {} }, action) => {
    switch (action.type) {
      case WAREHOUSE_UPDATE_REQUEST:
        return { loading: true };
      case WAREHOUSE_UPDATE_SUCCESS:
        return { loading: false, success: true, warehouse: action.payload };
      case WAREHOUSE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case WAREHOUSE_UPDATE_RESET:
        return { warehouse: {} };
      default:
        return state;
    }
 };
  