import isEmpty from "../../utils/isEmpty";
import { SET_LOCATION, SET_DESTINATION, SET_OFFER, SET_COMMENTS } from "../types";

const initialState = {
  location: {
    latitude: 0,
    longitude: 0
  },
  destination: "", // Initialize the destination property
  offer: "", // Initialize the offer property
  comments: "" // Initialize the comments property
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude
        }
      };
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload
      };
    case SET_OFFER:
      return {
        ...state,
        offer: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };

    // You can add more cases for other actions if needed

    default:
      return state;
  }
}
