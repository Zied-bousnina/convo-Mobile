import axios from "axios";
import { SET_ERRORS, SET_IS_LOADING, SET_PROFILES } from "../types";
import { setLoading } from "./authActions";
import {API_URL} from '@env';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateScore } from "./scoreAction";





export const AddProfile =  (userData, navigation ) => (dispatch) => {
  // console.log(userData)
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
    // console.log("errrrrrrrrrrrr",err);
  });
  axios.post(`https://xgenboxv2.onrender.com/api/profile/upload-profile`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {
        //////////////////////////////////////////console.log(res)

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
        console.log("errrrrrrrrrrrrrrrrrr",err)
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
  axios.get(`https://xgenboxv2.onrender.com/api/profile`)
      .then(async(res) => {
        // console.log(res.data)
        dispatch({
          type: SET_PROFILES,
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

export const EditProfile1 =  (userData, navigation ) => (dispatch) => {
  console.log(userData)
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
    // console.log("errrrrrrrrrrrr",err);
  });
  axios.put(`https://xgenboxv2.onrender.com/api/profile/EditProfile`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {
        console.log(res)

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
        console.log("errrrrrrrrrrrrrrrrrr",err)
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