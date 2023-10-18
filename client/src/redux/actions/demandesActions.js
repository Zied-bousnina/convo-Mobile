import axios from "axios"
import { SET_DEMANDES_MUNICIPAL, SET_ERRORS, SET_REQUEST } from "../types"
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

export const UpadeteRequest = (data, navigation)=> (dispatch) => {
  // console.log(data)
  axios.put(`https://xgenboxv2.onrender.com/api/demande-municipal/AcceptDemande/${data.id}`
  ,{status:data.status}
  )
  .then(async(res) => {
    // console.log(res.data)
    // console.log(">>>>>>>>>>>>>>>>>>> ligne 41: ",res.data?.data?.user)
    // dispatch({
    //   type: SET_DEMANDES_MUNICIPAL,
    //   payload: res.data,
      
    // })
    dispatch(createAccess({companyId: res.data?.data?.user}))
    
  })
  
  
  .catch( (err) =>{
     
         dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
          })
      }
     
  
      
  )

}

export const GetRequest =  () => (dispatch) => {
  // console.log("send requset")
  axios.get(`https://xgenboxv2.onrender.com/api/demande-municipal`)
      .then(async(res) => {
        // console.log("demande action:",res)
        dispatch({
          type: SET_REQUEST,
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


