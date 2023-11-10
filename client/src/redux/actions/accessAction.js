import axios from 'axios'
import { SET_CURRENT_ACCESS, SET_EMAIL_SENT, SET_ERRORS, SET_IS_LOADING, SET_LOADING, SET_PROFILES, SET_REQUEST, SET_USER, SET_VALID, SET_VERIFIED } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SetAuthToken } from '../../utils/SetAuthToken';
import { setLoading } from './authActions';



export const createAccess =  (userData, navigation ) => (dispatch) => {
    // console.log(userData)
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
  dispatch({
    type:SET_IS_SECCESS,
    payload:false
  })

    axios.post(`https://xgenboxv2.onrender.com/api/access/createAccess`, userData)
        .then(async(res) => {
            dispatch({
                type: SET_ERRORS,
                payload: {}
            })
            // console.log(res)

            dispatch({
              type:SET_IS_LOADING,
              payload:false
          })
          dispatch({
            type:SET_IS_SECCESS,
            payload:true
          })
          setTimeout(() => {
            dispatch({
              type:SET_IS_SECCESS,
              payload:false
            })
          }, 3000);




        })


        .catch( (err) =>{
            // console.log(err)
            setTimeout(() => {
                // Make API call or other asynchronous operation

                dispatch(setLoading(false));
              }, 2000);
               dispatch({
                  type: SET_ERRORS,
                  payload: err?.response?.data
                })

                dispatch({
                  type:SET_IS_LOADING,
                  payload:false
              })
              dispatch({
                type:SET_IS_SECCESS,
                payload:false
              })
            }



        )
}

export const GetCurrentAccess =  () => (dispatch) => {
  axios.get(`https://xgenboxv2.onrender.com/api/access/currentAccess`)
      .then(async(res) => {
        console.log("ligne 51",res.data)

        dispatch({
          type: SET_CURRENT_ACCESS,
          payload: res.data
        })
      })
      .catch( (err) =>{
        // console.log(err)
      // dispatch({
      //   type: SET_PROFILES,
      //   payload: res.data

      // })
    }

      )
}



