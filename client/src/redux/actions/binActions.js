import axios from 'axios'
import { SET_ALL_BINS, SET_BINS, SET_BINS_BY_MUNICIPAL, SET_CURRENT_ACCESS, SET_EMAIL_SENT, SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS, SET_LOADING, SET_NOT_SUCCESS, SET_PROFILES, SET_REQUEST, SET_USER, SET_VALID, SET_VERIFIED } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SetAuthToken } from '../../utils/SetAuthToken';
import { setLoading } from './authActions';
import { $CombinedState } from 'redux';
import { AddScore } from './scoreAction';



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
        // console.log("ligne 51",res.data)
        
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

export const getAllBins = ()=>(dispatch)=> {
  axios.get(`https://xgenboxv2.onrender.com/api/bin/getAllBins`)
  .then(async(res) => {
    // console.log("ligne 51",res.data)
    
    dispatch({
      type: SET_ALL_BINS,
      payload: res.data
    })
  }
  )
  .catch( (err) =>{
    // console.log(err)
  // dispatch({

  //   type: SET_PROFILES,
  //   payload: res.data

  // })
  })
}

export const addAccessCode = (code)=>(dispatch)=> {

  // console.log("ligne 92",code)
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
dispatch({
  type:SET_NOT_SUCCESS,
  payload:false
})
  
    axios.put(`https://xgenboxv2.onrender.com/api/users/access/addAccess`, {code})
        .then(async(res) => {
            dispatch({
                type: SET_ERRORS,
                payload: {}
            })
            // console.log(res)
            dispatch({
              type: SET_ERRORS,
              payload: {}
          })
          // console.log(res)
          
          dispatch({
            type: SET_ERRORS,
            payload: []
        })
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
          
          // navigation.navigate('Dashboard');
        }, 2900);
        setTimeout(() => {
          dispatch({
            type:SET_IS_SECCESS,
            payload:false
          })
          
          // navigation.navigate('Dashboard');
        }, 3000);
         
        setTimeout(() => {
          dispatch({
            type:SET_IS_SECCESS,
            payload:false
          })
          
        }, 3000);
         
          
    
            // navigation.navigate('Dashboard');
          
           
           
            

        })
        
        
        .catch( (err) =>{
            // console.log(err)
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
            dispatch({
              type:SET_NOT_SUCCESS,
              payload:true
            })
            setTimeout(() => {
              dispatch({
                type:SET_NOT_SUCCESS,
                payload:false
              })
              
            }, 2900);
            setTimeout(() => {
              dispatch({
                type:SET_NOT_SUCCESS,
                payload:false
              })
              // navigation.navigate('Dashboard')
            }, 5000);
                
            }
           
        
            
        )
}

export const openBin = (idBin, navigation)=>(dispatch)=> {
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
dispatch({
  type:SET_NOT_SUCCESS,
  payload:false
})
    
  axios.put(`https://xgenboxv2.onrender.com/api/bin/openBin/${idBin}`)
  .then(async(res) => {
    dispatch(AddScore())
      dispatch({
          type: SET_ERRORS,
          payload: {}
      })
      // console.log(res)
      
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
      type:SET_IS_SECCESS,
      payload:true
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
      
      // navigation.navigate('Dashboard');
    }, 4000);
    setTimeout(() => {
      dispatch({
        type:SET_IS_SECCESS,
        payload:false
      })
      
      navigation.navigate('Dashboard');
    }, 4100);
     
    setTimeout(() => {
      dispatch({
        type:SET_IS_SECCESS,
        payload:false
      })
      
    }, 3000);
     
      

  })
  
  
  .catch( (err) =>{
      // console.log(err)
      
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
          dispatch({
            type:SET_NOT_SUCCESS,
            payload:true
          })
          setTimeout(() => {
            dispatch({
              type:SET_NOT_SUCCESS,
              payload:false
            })
            
          }, 2900);
          setTimeout(() => {
            dispatch({
              type:SET_NOT_SUCCESS,
              payload:false
            })
            navigation.navigate('Dashboard')
          }, 3000);
      }
     
  
      
  )

}

export const fetchBins = ()=>dispatch=> {
  
  axios.get(`https://xgenboxv2.onrender.com/api/bin/fetchAllPointBinsAndHerBinsByUserId`)
  .then(async(res) => {
      dispatch({
          type: SET_ERRORS,
          payload: {}
      })
      dispatch({
        type: SET_BINS,
        payload: res.data
      })
      // console.log(res)
      
    
  })
  
  
  .catch( (err) =>{
     
    dispatch({
      type: SET_ERRORS,
      payload: err?.response?.data
    })
      }
     
  
      
  )

}

export const fetchPointBinByMunicipal = (municipal)=>(dispatch)=> {
  dispatch({
    type: SET_ERRORS,
    payload: []
})

  axios.get(`https://xgenboxv2.onrender.com/api/Pointbin/fetchPointBinByMunicipal/${municipal}`)
  .then(async(res) => {

    dispatch({
      type: SET_BINS,
      payload: res.data
    })
      dispatch({
          type: SET_ERRORS,
          payload: {}
      })
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
   
      

  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err?.response?.data
    })
   
  }
  )
  
}

export const fetchBinByMunicipal = (municipal)=>(dispatch)=> {
  dispatch({
    type: SET_ERRORS,
    payload: []
})

  axios.get(`https://xgenboxv2.onrender.com/api/bin/FetchBinsNotInPointBinByMunicipal/${municipal}`)
  .then(async(res) => {
    // console.log(res.data)

    dispatch({
      type: SET_BINS_BY_MUNICIPAL,
      payload: res.data
    })
      dispatch({
          type: SET_ERRORS,
          payload: {}
      })
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
   

  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err?.response?.data
    })
   
  }
  )
  
}