/* eslint-disable prettier/prettier */
import axios from 'axios'
import { SET_CURRENT_ACCESS, SET_EMAIL_SENT, SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS, SET_LOADING, SET_NOT_SUCCESS, SET_PROFILES, SET_REQUEST, SET_USER, SET_VALID, SET_VERIFIED, SET_mail_SENT } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { SetAuthToken } from '../../utils/SetAuthToken';
import jwt_decode from "jwt-decode"
import { GetProfile } from './profile.actions';
// import {BASE_URL} from '@env';
import Login from '../../components/Auth/Login';
import { GetRequest } from './demandesActions';
import { GetCurrentAccess } from './accessAction';
const BASE_URL= 'https://convoyage.onrender.com'

export const registerUser =  (userData, navigation ) => (dispatch) => {


    dispatch({
        type: SET_ERRORS,
        payload: {}
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    dispatch({
        type:SET_IS_SECCESS,
        payload:false
    })
    axios.post(`${BASE_URL}/api/register`, userData)
        .then(async(res) => {
            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
            dispatch({
                type:SET_IS_SECCESS,
                payload:true
            })
            setInterval(() => {
                dispatch({
                    type:SET_IS_SECCESS,
                    payload:false
                })

            }, 3000);
            setTimeout(() => {

                dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
                dispatch(setLoading(false));


                    navigation.navigate('VerifyEmailScreen', {email:res?.data?.user?.email, userId:res?.data?.user?._id})


                dispatch(setLoading(true));
            }, 1000);




        })


        .catch( (err) =>{
               dispatch({
                  type: SET_ERRORS,
                  payload: err?.response?.data
                })

                dispatch({
                    type: SET_ERRORS,
                    payload: err?.response?.data
                  })

                  dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
                setTimeout(() => {

                    dispatch({
                        type:SET_IS_SECCESS,
                        payload:false
                    })
                }, 3000);
            }



        )
}
export const verifyEmail = (userData, navigation)=>(dispatch)=> {
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    dispatch({
        type: SET_IS_SECCESS,
        payload: false
    })
    dispatch({
        type:SET_NOT_SUCCESS,
        payload:false
      })

    axios.post(`${BASE_URL}/api/users/verifyemail`, userData)
    .then(async(res) => {

        dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
        dispatch({
            type: SET_IS_SECCESS,
            payload: true
        })

        setTimeout(() => {
            dispatch({
                type: SET_IS_SECCESS,
                payload: false
            })
        }, 3000);
        dispatch({
            type:SET_NOT_SUCCESS,
            payload:false
          })



        dispatch({
            type: SET_VERIFIED,
            payload: res.data.success
        })

        dispatch({
            type: SET_VALID,
            payload: res.data.success
        })
        dispatch(LogOut())

        setTimeout(() => {
            navigation.navigate('Login', {email:res?.data?.user?.email})
        }, 100);

            dispatch( {
                type: SET_USER,
                payload: {}
            })
        }).catch(async (err) => {


            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
            dispatch({
                type:SET_NOT_SUCCESS,
                payload:true
              })
            setTimeout(() => {
            dispatch({
                type:SET_NOT_SUCCESS,
                payload:false
              })


              }, 4000);


            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
            })
           }


        )
}

export const deleteaccount = (userData, navigation)=>(dispatch)=> {

    axios.post(`https://xgenboxv2.onrender.com/api/users/deleteaccount`, userData)
    .then(async(res) => {
        dispatch({
            type: SET_VERIFIED,
            payload: res.data.success
        })

        dispatch({
            type: SET_VALID,
            payload: res.data.success
        })
        // navigation.navigate('Login', {email:res?.data?.user?.email})
        dispatch(LogOut())


            dispatch({
                type: SET_EMAIL_SENT,
                payload: true
            });


            dispatch( {
                type: SET_USER,
                payload: {}
            })

            dispatch(setLoading(false));

            // dispatch(setLoading(true));
            setTimeout(() => {


                dispatch({
                    type: SET_ERRORS,
                    payload: {}

                })
                // navigation.navigate('Login', {email:res?.data?.user?.email})
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 4000);


        })


        .catch(async (err) => {



            setTimeout(() => {


                dispatch(setLoading(false));
            }, 2310);
            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
            })
           }


        )
}
export function setLoading(isLoading) {
    return {
      type: SET_LOADING,
      payload: isLoading,
    };
  }

export const resendOtp = (email)=>dispatch=> {
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    dispatch({
        type: SET_mail_SENT,
        payload: false
    })
    dispatch({
        type:SET_NOT_SUCCESS,
        payload:false
      })
    axios.post(`${BASE_URL}/api/users/resendotp`, email)
    .then(async(res) => {
        dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
        dispatch({
            type: SET_mail_SENT,
            payload: true
        })

        setTimeout(() => {
            dispatch({
                type: SET_mail_SENT,
                payload: false
            })
        }, 3000);
        dispatch({
            type:SET_NOT_SUCCESS,
            payload:false
          })
          dispatch({
              type: SET_ERRORS,
              payload: {}

          })




        })
        .catch(async (err) => {

            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
            dispatch({
                type:SET_NOT_SUCCESS,
                payload:true
              })
            setTimeout(() => {
            dispatch({
                type:SET_NOT_SUCCESS,
                payload:false
              })


              }, 4000);

                dispatch({
                    type: SET_ERRORS,
                    payload: err?.response?.data
                })


              }
              )
}

export const resendOTPDeleteAccount = (email)=>dispatch=> {
    axios.post(`https://xgenboxv2.onrender.com/api/users/resendOTPDeleteAccount`, email)
    .then(async(res) => {

            dispatch({
                type: SET_EMAIL_SENT,
                payload: true
            });
            // dispatch(setLoading(true));
            setTimeout(() => {


                dispatch({
                    type: SET_ERRORS,
                    payload: {}

                })
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 2310);


        })
        .catch(async (err) => {

            setTimeout(() => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err?.response?.data
                })
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 2310);
              }
              )
}

export const makeRequestMunicipal =  (userData, navigation ) => (dispatch) => {

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
    axios.post(`https://xgenboxv2.onrender.com/api/demande-municipal`, userData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        // 'Authorization': 'Bearer ' + token
      }

    })
        .then(async(res) => {

            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
            dispatch(LogOut())
            setTimeout(() => {

                navigation.navigate('Login')
            }, 1000);






        })
        .catch( (err) =>{

        dispatch(LogOut())
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




export const setCurrentUser = (decoded) => {
    return {
        type: SET_USER,
        payload: decoded
    }
}


export const loginUser = (userData) => dispatch => {

    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    dispatch(LogOut())
    axios
        .post(`${BASE_URL}/api/users/login`, {email:userData.email, password:userData.password})
        .then(res => {
            // Save to localStorage
            const { token } = res.data
            // Set token to localStorage

            // dispatch(GetRequest())
            // dispatch(GetProfile())
            // dispatch(GetCurrentAccess())
            // dispatch(GetRequest())

            AsyncStorage.setItem('jwtToken', token)


            // Set token to Auth header
            SetAuthToken(token)
            // Decode token to get user data
            const decode = jwt_decode(token)

            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))

            dispatch({
                type: SET_ERRORS,
                payload: []
            })
            setTimeout(() => {

                dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
            }, 1000);
        })
        .catch(err =>
           {

            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
            })
            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
        }

        )
}



export const LogOut = (navigation)=>dispatch=>{
    AsyncStorage.removeItem("jwtToken")




    dispatch( {
        type: SET_USER,
        payload: {}
    })
    dispatch({
        type: SET_PROFILES,
        payload:[]
    })
    dispatch({
        type: SET_REQUEST,
        payload:{}
    })
    dispatch({
        type: SET_CURRENT_ACCESS,
        payload:[]
    })
    // navigation.navigate('Login')

}

export const getUserByEmail = (info,navigation)=>dispatch=>{
    const {idToken,user } = info
    const {email, familyName, givenName, id, photo } = info.user


const data = {email, name:familyName+' '+givenName,avatar:photo, googleId:id, tokenId:idToken}

    axios.get(`https://xgenboxv2.onrender.com/api/users/getUserByEmail/${info.user.email}`)
    .then(res => {

        dispatch({
            type: SET_USER,
            payload: res?.data
        })


        dispatch(registerGoogleUser(data))

        // dispatch(loginUser(data))
    })
    .catch(err =>
       {

        dispatch(registerGoogleUser(data))
    }
    )
}

export const registerGoogleUser = (userData, navigation ) => (dispatch) => {
    axios.post(`https://xgenboxv2.onrender.com/api/users/registerGoogleUser`, userData)
        .then(async(res) => {
            dispatch({
                type: SET_ERRORS,
                payload: {}
            })

            AsyncStorage.setItem('jwtToken', res.data.token)


            // Set token to Auth header
            SetAuthToken(res.data.token)
            // Decode token to get user data
            const decode = jwt_decode(res.data.token)

            const decoded = jwt_decode(res.data.token)


            // Set current user
            dispatch(setCurrentUser(decoded))
            dispatch(GetRequest())
            dispatch(GetProfile())


            setTimeout(() => {


                dispatch(setLoading(false));
                // navigation.navigate('EditProfile', {email:res?.data?.user?.email, userId:res?.data?.user?._id})

                dispatch(setLoading(true));
            }, 3000);




        })


        .catch( (err) =>{

            dispatch(GetProfile())
               dispatch({
                  type: SET_ERRORS,
                  payload: err?.response?.data
                })
            }



        )
}

export const forgotPassword = (email)=>dispatch=> {

    dispatch({
        type: SET_ERRORS,
        payload: {}

    })
    dispatch({
        type: SET_EMAIL_SENT,
        payload: true
    });
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    axios.post(`${BASE_URL}/api/users/forgot-password`, {email})
    .then(async(res) => {

            dispatch({
                type: SET_EMAIL_SENT,
                payload: true
            });

            setTimeout(() => {


                dispatch({
                    type: SET_ERRORS,
                    payload: {}

                })
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 2310);
            setTimeout(() => {

                dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
            }, 1000);


        })
        .catch(async (err) => {

                dispatch({
                    type: SET_ERRORS,
                    payload: err?.response?.data
                })
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
                dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
            // }, 2310);
              }
              )
}

