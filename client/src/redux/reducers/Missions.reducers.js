/* eslint-disable prettier/prettier */
// reducer.js

import { GET_PRODUCTS_FULFILLED, GET_PRODUCTS_PENDING, GET_PRODUCTS_REJECTED,SET_RESET_STATE } from "../types";

// import * as actionTypes from './actionTypes';

const initialState = {
  missions: {
    page: 0,
    count: 999,
    limit: 10,
    items: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export default function (state = initialState, action)  {
    // console.log("action", action?.payload?.response_data)
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
      case GET_PRODUCTS_FULFILLED:
        const newItems = action.payload.response_data?.missions || [];
        const currentItems = state.missions.items || [];

        // Identify unique items based on the _id property
        const uniqueItems = [
          ...newItems.filter(newItem => !currentItems.some(currentItem => currentItem._id === newItem._id)),
          ...currentItems,
        ];

        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          missions: {
            ...state.missions,
            items:      uniqueItems,
            // uniqueItems,
            count: parseInt(action.payload.response_data.count),
            page: parseInt(action.payload.query.page) + 1,
          },
        };
    case GET_PRODUCTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case SET_RESET_STATE :
      return {
        missions: {
          page: 0,
          count: 999,
          limit: 10,
          items: [],
        },
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      };
    default:
      return state;
  }
};

// export default productReducer;
