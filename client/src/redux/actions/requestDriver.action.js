import { SET_COMMENTS, SET_DESTINATION, SET_LOCATION, SET_OFFER } from "../types"

export const AddLocation =  (Location, navigation ) => (dispatch) => {
    dispatch({
      type:SET_LOCATION,
      payload:Location
  })

  }

  export const setDestination = (destination) => (dispatch) => {
    dispatch({
      type: SET_DESTINATION,
      payload: destination
    });
  };

  export const setOffer = (offer) => (dispatch) => {
    dispatch({
      type: SET_OFFER,
      payload: offer
    });
  };

  export const setComments = (comments) => (dispatch) => {
    dispatch({
      type: SET_COMMENTS,
      payload: comments
    });
  };