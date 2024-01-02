import axios from "axios"
import { SET_DEMANDES_MUNICIPAL, SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS, SET_REQUEST, SET_REQUESTS_CLEANING, SET_REQUESTS_SENT } from "../types"
import { createAccess } from "./accessAction"





export const findDemandeInProgress = ( navigation)=> (dispatch) => {
  axios.get(`https://xgenboxv2.onrender.com/api/demande-municipal/findDemandeInProgress`)
  .then(async(res) => {


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


  axios.put(`https://xgenboxv2.onrender.com/api/cleaning/AcceptCleaningRequestMunicipal/${data}`

  )
  .then(async(res) => {



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


  axios.get(`https://xgenboxv2.onrender.com/api/cleaning/findSingleCleaningService`)
      .then(async(res) => {


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


  axios.get(`https://xgenboxv2.onrender.com/api/cleaning/findDemandeInProgressMunicipal`)
      .then(async(res) => {


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


  axios.delete(`https://xgenboxv2.onrender.com/api/cleaning/delete/${data.requestId}`)
      .then(async(res) => {


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

