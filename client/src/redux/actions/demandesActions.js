/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  ACCEPTED_MISSIONS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FULFILLED,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_REJECTED,
  SET_DEMANDES,
  SET_DEMANDES_MUNICIPAL,
  SET_ERRORS,
  SET_FACTURES,
  SET_IS_LOADING,
  SET_LAST_MISSION,
  SET_MES_MISSIONS,
  SET_MISSIONS,
  SET_REQUEST,
} from '../types';
import {createAccess} from './accessAction';
import {setLoading} from './authActions';
import { createSelector } from 'reselect';
// import { GetMissions } from './demandesActions';
import {API_URL} from '@env';
// const BASE_URL= 'https://convoyage.onrender.com'
const BASE_URL= 'https://convoyage.onrender.com'

export const AddDemande = (userData, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post(`${BASE_URL}/api/users/createDemande`, userData)
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
      `${BASE_URL}/api/users/incrementOffer/${demandeId}`,
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
export const AccepteMission = (demandeId,images, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });
  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  })

  return axios
    .post(
      `${BASE_URL}/api/users/AccepteMission/${demandeId}`,
      images,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
          // 'Authorization': 'Bearer ' + token
        }

      }
    )
    .then( res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);

      navigation.navigate('Missions')
      // navigation.navigate("city",{
      //   demandeId:res?.data?.demand?._id,
      //   distance:res?.data?.demand?.distance,
      //   address:res?.data?.demand?.address,
      //   destination:res?.data?.demand?.destination,
      //   comments:res?.data?.demand?.comments,
      //   // offer:data?.data?.offer,
      //   status:res?.data?.demand?.status,
      //   postalAddress:res?.data?.demand?.postalAddress,
      //   postalDestination:res?.data?.demand?.postalDestination,
      //   // postalCode:data?.data?.postalCode,
      //   // postalDestinationCode:data?.data?.postalDestinationCode,

      // })
      // navigation.navigate("AcceptationScreen",userData )
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      })
      return res.data; // Return data if needed
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
      throw err; // Rethrow the error if needed
    });
};
export const TermineeMission = (demandeId,images, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

 return axios
    .post(
      `${BASE_URL}/api/users/TermineeMission/${demandeId}`,
      images,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
          // 'Authorization': 'Bearer ' + token
        }

      }
    )
    .then( res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);


      // navigation.navigate('city')
      navigation.navigate('Missions')
      // navigation.navigate("AcceptationScreen",{
      //   demandeId:res?.data?.demand?._id,
      //   distance:res?.data?.demand?.distance,
      //   address:res?.data?.demand?.address,
      //   destination:res?.data?.demand?.destination,
      //   comments:res?.data?.demand?.comments,
      //   // offer:data?.data?.offer,
      //   status:res?.data?.demand?.status,
      //   postalAddress:res?.data?.demand?.postalAddress,
      //   postalDestination:res?.data?.demand?.postalDestination,
      //   // postalCode:data?.data?.postalCode,
      //   // postalDestinationCode:data?.data?.postalDestinationCode,

      // })
      // navigation.navigate("AcceptationScreen",userData )
      return res.data; // Return data if needed
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
      throw err; // Rethrow the error if needed
    });
};
export const ConfirmeeMissionByDriver = (demandeId, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

 return axios
    .post(
      `${BASE_URL}/api/users/ConfirmeMissionByDriver/${demandeId}`
    )
    .then( res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);


      // navigation.navigate('city')
      navigation.navigate('Missions')
      // navigation.navigate("AcceptationScreen",{
      //   demandeId:res?.data?.demand?._id,
      //   distance:res?.data?.demand?.distance,
      //   address:res?.data?.demand?.address,
      //   destination:res?.data?.demand?.destination,
      //   comments:res?.data?.demand?.comments,
      //   // offer:data?.data?.offer,
      //   status:res?.data?.demand?.status,
      //   postalAddress:res?.data?.demand?.postalAddress,
      //   postalDestination:res?.data?.demand?.postalDestination,
      //   // postalCode:data?.data?.postalCode,
      //   // postalDestinationCode:data?.data?.postalDestinationCode,

      // })
      // navigation.navigate("AcceptationScreen",userData )
      return res.data; // Return data if needed
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
      throw err; // Rethrow the error if needed
    });
};
export const RefuseMission = (demandeId, navigation) => dispatch => {

  dispatch({
    type: SET_IS_LOADING,
    payload: true,
  });

  axios
    .post(
      `${BASE_URL}/api/users/RefuseMission/${demandeId}`,
    )
    .then(async res => {


      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
      navigation.navigate("Driver" )
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
    .post(`${BASE_URL}/api/users/decreaseOffer/${demandeId}`)
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
    .get(`${BASE_URL}/api/users/findDemandsByUserId`)
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
export const FindLastMission = navigation => dispatch => {

  axios
    .get(`${BASE_URL}/api/users/findLastMissionByUser`)
    .then(async res => {


      dispatch({
        type: SET_LAST_MISSION,
        payload: res.data,
      });
    })

    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });
    });
};

export const Findfactures = navigation => dispatch => {

  axios
    .get(`${BASE_URL}/api/users/facture/fetchAllFacturesByDriver`)
    .then(async res => {


      dispatch({
        type: SET_FACTURES,
        payload: res.data,
      });
    })

    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      dispatch({
        type: SET_FACTURES,
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
    .delete(`${BASE_URL}/api/users/delete/${idDemande}`)
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
    .get(`${BASE_URL}/api/users/findMissionsByUser?limit=5&skip=5`)
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
      `${BASE_URL}/api/users/findMissionsByUser?limit=${data.limit}&skip=${data.skip}`
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


export const AcceptedMission = () => dispatch => {

  axios
    .get(`${BASE_URL}/api/users/findMissionsTermineeByUser`)
    .then(async res => {


      dispatch({
        type: ACCEPTED_MISSIONS,
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

export const Mes_missions = (dispatch) => dispatch => {

  axios
    .get(`${BASE_URL}/api/users/findMissionsConfirmeByUser`)
    .then(async res => {


      dispatch({
        type: SET_MES_MISSIONS,
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


