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
    WAREHOUSE_UPDATE_SUCCESS
} from "../constants/warehouseConstants";
import axios from "axios";

export const saveWareHouseAddress = 
    (address, number, city, state, postalCode, complement) => 
    async (dispatch) => {
        try {
            dispatch({ type: WAREHOUSE_CREATE_REQUEST });

            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/warehouse`,
                { address, number, city, state, postalCode, complement },
                config
            );

            dispatch({ type: WAREHOUSE_CREATE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: WAREHOUSE_CREATE_FAIL, 
                       payload:
                          error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            });
        }
    };

export const editWarehouseAddress = () => async(dispatch) => {
    try {
        dispatch({ type: WAREHOUSE_EDIT_REQUEST });
        const { data } = await axios.get(`/api/warehouse`);
        dispatch({ type: WAREHOUSE_EDIT_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: WAREHOUSE_EDIT_FAIL,
          payload: message,
        });
      }
};
