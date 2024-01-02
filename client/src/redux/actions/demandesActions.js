/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FULFILLED,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_REJECTED,
  SET_DEMANDES,
  SET_DEMANDES_MUNICIPAL,
  SET_ERRORS,
  SET_IS_LOADING,
  SET_MISSIONS,
  SET_REQUEST,
} from '../types';
import {createAccess} from './accessAction';
import {setLoading} from './authActions';
import { createSelector } from 'reselect';
// import { GetMissions } from './demandesActions';

export const AddDemande = (userData, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post('https://convoyage.onrender.com/api/users/createDemande', userData)
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);

      navigation.navigate('FindDriverScreen', {
        ...userData,
        demandeId: res?.data?.demande?._id,
      });
    })
    .catch(err => {


      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    });
};
export const increaseOffer = (demandeId, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post(
      `https://convoyage.onrender.com/api/users/incrementOffer/${demandeId}`,
    )
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
      // navigation.navigate("FindDriverScreen",userData )
    })
    .catch(err => {

      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    });
};
export const AccepteMission = (demandeId, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post(
      `http://192.168.1.16:3600/api/users/AccepteMission/${demandeId}`,
    )
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
      // navigation.navigate("FindDriverScreen",userData )
    })
    .catch(err => {

      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    });
};
export const RefuseMission = (demandeId, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post(
      `http://192.168.1.16:3600/api/users/RefuseMission/${demandeId}`,
    )
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
      // navigation.navigate("FindDriverScreen",userData )
    })
    .catch(err => {

      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    });
};
export const decreaseOffer = (demandeId, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post(`https://convoyage.onrender.com/api/users/decreaseOffer/${demandeId}`)
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
      // navigation.navigate("FindDriverScreen",userData )
    })
    .catch(err => {

      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    });
};
export const FindRequestDemande = navigation => dispatch => {
  axios
    .get('https://convoyage.onrender.com/api/users/findDemandsByUserId')
    .then(async res => {

      dispatch({
        type: SET_DEMANDES,
        payload: res.data,
      });
    })

    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_DEMANDES,
        payload: [],
      });
    });
};
export const DeleteDEmande = idDemande => dispatch => {
  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });
  axios
    .delete(`https://convoyage.onrender.com/api/users/delete/${idDemande}`)
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    })

    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    });
};

export const findDemandeInProgress = navigation => dispatch => {
  axios
    .get(
      'https://xgenboxv2.onrender.com/api/demande-municipal/findDemandeInProgress',
    )
    .then(async res => {

      dispatch({
        type: SET_DEMANDES_MUNICIPAL,
        payload: res.data,
      });
    })

    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
    });
};

export const UpadeteRequest = (data, navigation) => dispatch => {

  axios
    .put(
      `https://xgenboxv2.onrender.com/api/demande-municipal/AcceptDemande/${data.id}`,
      {status: data.status},
    )
    .then(async res => {

      dispatch(createAccess({companyId: res.data?.data?.user}));
    })

    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
    });
};

export const GetRequest = () => dispatch => {

  axios
    .get('https://xgenboxv2.onrender.com/api/demande-municipal')
    .then(async res => {

      dispatch({
        type: SET_REQUEST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const GetMission = () => dispatch => {

  axios
    .get(`http://192.168.1.16:3600/api/users/findMissionsByUser?limit=5&skip=5`)
    .then(async res => {

      dispatch({
        type: SET_REQUEST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

const getProducts = async (data) => {
  try {
    const response = await axios.get(
      `http://192.168.1.16:3600/api/users/findMissionsByUser?limit=${data.limit}&skip=${data.skip}`
    );


    return response.data;
  } catch (error) {
    throw error.response.data.message || error.toString();
  }
};
export const getProductsPending = () => ({
  type: GET_PRODUCTS_PENDING,
});

export const getProductsFulfilled = (data) => ({
  type: GET_PRODUCTS_FULFILLED,
  payload: data,
});

export const getProductsRejected = (error) => ({
  type: GET_PRODUCTS_REJECTED,
  payload: error,
});

export const GetMissions = (data) => {
  return async (dispatch) => {
    dispatch(getProductsPending());
    try {
      const response = await getProducts(data);

      dispatch(getProductsFulfilled({ response_data: response, query: data }));
    } catch (error) {
      const message = error.response?.data?.message || error.toString();
      dispatch(getProductsRejected(message));
    }
  };
};

