import axios from 'axios'
import { SET_CURRENT_ACCESS, SET_EMAIL_SENT, SET_ERRORS, SET_IS_LOADING, SET_LOADING, SET_PROFILES, SET_REQUEST, SET_SCORES, SET_USER, SET_VALID, SET_VERIFIED } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SetAuthToken } from '../../utils/SetAuthToken';
import { setLoading } from './authActions';



export const AddScore =  (userData, navigation ) => (dispatch) => {


    axios.post(`https://xgenboxv2.onrender.com/api/score/addScore`)
        .then(async(res) => {





        })


        .catch( (err) =>{

            }



        )
}

export const fetchScore =  () => (dispatch) => {
  axios.get(`https://xgenboxv2.onrender.com/api/score/findScore`)
      .then(async(res) => {



        dispatch({
          type: SET_SCORES,
          payload: res.data
        })
      })
      .catch( (err) =>{

    }

      )
}

export const CreateScore =  (userData, navigation ) => (dispatch) => {


  axios.post(`https://xgenboxv2.onrender.com/api/score/createScore`)
      .then(async(res) => {





      })


      .catch( (err) =>{

          }



      )
}




