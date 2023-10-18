import axios from "axios"
import { SET_DEMANDES_MUNICIPAL, SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS, SET_REQUEST, SET_REQUESTS_CLEANING, SET_REQUESTS_SENT } from "../types"
import { createAccess } from "./accessAction"





export const findDemandeInProgress = ( navigation)=> (dispatch) => {
  axios.get(`https://xgenboxv2.onrender.com/api/demande-municipal/findDemandeInProgress`)
  .then(async(res) => {
    // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
    dispatch({
      type: SET_DEMANDES_MUNICIPAL,
      payload: res.data,
      
    })
    
  })
  
  
  .catch( (err) =>{
     
         dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
          })
      }
     
  
      
  )

}


export const FinishCleaningRequest = (data, navigation)=> (dispatch) => {
  // console.log(data)
  axios.put(`https://xgenboxv2.onrender.com/api/cleaning/AcceptCleaningRequestMunicipal/${data}`
  
  )
  .then(async(res) => {
    // console.log(res.data)
    // console.log(">>>>>>>>>>>>>>>>>>> ligne 41: ",res.data?.data?.user)
    // dispatch({
    //   type: SET_DEMANDES_MUNICIPAL,
    //   payload: res.data,
      
    // })
    // dispatch(createAccess({companyId: res.data?.data?.user}))
    
  })
  
  
  .catch( (err) =>{
     
         dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
          })
      }
     
  
      
  )

}

export const findSingleCleaningService =  () => (dispatch) => {
  // console.log("send requset")
  axios.get(`https://xgenboxv2.onrender.com/api/cleaning/findSingleCleaningService`)
      .then(async(res) => {
        // console.log("demande action:",res.data)
        dispatch({
          type: SET_REQUESTS_SENT,
          payload: res.data
          
        })
      })
      .catch( (err) =>{
      dispatch({
        type: SET_ERRORS,
        payload: err
        
      })
    }
         
      )
}
export const findDemandeInProgressMunicipal =  () => (dispatch) => {
  // console.log("send requset")
  axios.get(`https://xgenboxv2.onrender.com/api/cleaning/findDemandeInProgressMunicipal`)
      .then(async(res) => {
        // console.log("demande action:",res.data)
        dispatch({
          type: SET_REQUESTS_CLEANING,
          payload: res.data
          
        })
      })
      .catch( (err) =>{
      dispatch({
        type: SET_ERRORS,
        payload: err
        
      })
    }
         
      )
}


export const DeleteRequestCleaningService =  (data) => (dispatch) => {
  // console.log("send requset")
  axios.delete(`https://xgenboxv2.onrender.com/api/cleaning/delete/${data.requestId}`)
      .then(async(res) => {
        // console.log("delete action:",res.data)
       
      })
      .catch( (err) =>{
      dispatch({
        type: SET_ERRORS,
        payload: err
        
      })
    }
         
      )
}

export const CreateRequestCleaning =  (userData, navigation ) => (dispatch) => {
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
  axios.post(`https://xgenboxv2.onrender.com/api/cleaning`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {
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
      }, 5000);
      })
      .catch( (err) =>{
        console.log(err)
       
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

