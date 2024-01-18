/* eslint-disable prettier/prettier */
import axios from "axios";
import { SET_ERRORS, SET_IS_LOADING, SET_PROFILES } from "../types";
import { setLoading } from "./authActions";
import {API_URL} from '@env';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateScore } from "./scoreAction";

// import {API_URL} from '@env';

const BASE_URL= 'http://192.168.1.16:3600'

export const AddProfile =   (userData, navigation ) => (dispatch) => {

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  AsyncStorage.getItem('jwtToken').then((value) => {
    if (value) {
      // settoken(value)
    }
  }).catch((err) => {

  });
  axios.post(`${BASE_URL}/api/profile/upload-profile`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {


        dispatch(CreateScore())

        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
        dispatch(
          setLoading(true)
        )
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      })
      .catch( (err) =>{


        dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      }

      )
}

export const GetProfile =  () => (dispatch) => {
  axios.get(`${BASE_URL}/api/profile`)
      .then(async(res) => {

        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
      })
      .catch( (err) =>{

    }

      )
}

export const EditProfile1 =  (userData, navigation ) => (dispatch) => {

  // const [token, settoken] = useState('')
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  AsyncStorage.getItem('jwtToken').then((value) => {
    if (value) {
      // settoken(value)
    }
  }).catch((err) => {

  });
  axios.put(`${BASE_URL}/api/profile/EditProfile`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {


        dispatch(CreateScore())

        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
        dispatch(
          setLoading(true)
        )
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      })
      .catch( (err) =>{

        dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      }

      )
}