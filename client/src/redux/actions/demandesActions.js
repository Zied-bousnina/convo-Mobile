import axios from "axios"
import { SET_DEMANDES, SET_DEMANDES_MUNICIPAL, SET_ERRORS, SET_IS_LOADING, SET_MISSIONS, SET_REQUEST } from "../types"
import { createAccess } from "./accessAction"
import { setLoading } from "./authActions"




export const AddDemande =  (userData, navigation ) => (dispatch) => {
  // console.log(userData)
  // const [token, settoken] = useState('')
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`https://convoyage.onrender.com/api/users/createDemande`, userData)
      .then(async(res) => {
        //////////////////////////////////////////console.log(res)





        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
        console.log("res", res?.data?.demande?._id)
        navigation.navigate("FindDriverScreen",{...userData, demandeId:res?.data?.demande?._id} )
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
export const increaseOffer =  (demandeId, navigation ) => (dispatch) => {
  // console.log(userData)
  // const [token, settoken] = useState('')
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`https://convoyage.onrender.com/api/users/incrementOffer/${demandeId}`)
      .then(async(res) => {
        //////////////////////////////////////////console.log(res)





        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
        // navigation.navigate("FindDriverScreen",userData )
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
export const decreaseOffer =  (demandeId, navigation ) => (dispatch) => {
  // console.log(userData)
  // const [token, settoken] = useState('')
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`https://convoyage.onrender.com/api/users/decreaseOffer/${demandeId}`)
      .then(async(res) => {
        //////////////////////////////////////////console.log(res)





        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
        // navigation.navigate("FindDriverScreen",userData )
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
export const FindRequestDemande = ( navigation)=> (dispatch) => {
  axios.get(`https://convoyage.onrender.com/api/users/findDemandsByUserId`)
  .then(async(res) => {
    // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
    dispatch({
      type: SET_DEMANDES,
      payload: res.data,

    })

  })


  .catch( (err) =>{

         dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
          })
          dispatch({
            type: SET_DEMANDES,
            payload: [],

          })
      }



  )

}
export const DeleteDEmande = ( idDemande)=> (dispatch) => {
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  axios.delete(`https://convoyage.onrender.com/api/users/delete/${idDemande}`)
  .then(async(res) => {
    console.log(">>>>>>>>>>>>>>>>>>>",res.data)

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

export const GetMissions =  () => (dispatch) => {
  // console.log("send requset")
  axios.get(`https://convoyage.onrender.com/api/users/findMissionsByUser`)
      .then(async(res) => {
        // console.log("demande action:",res.data)
        dispatch({
          type: SET_MISSIONS,
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




