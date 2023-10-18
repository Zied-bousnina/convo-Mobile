import axios from "axios"
import { SET_CURRENT_ACCESS_LIST, SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS, SET_SOME_ACCESS_LIST_USERS } from "../types"

export const GetCurrentAccessList =  () => (dispatch) => {
  axios.get(`https://xgenboxv2.onrender.com/api/users/access/getCurrentAccessList`)
      .then(async(res) => {
        // console.log("ligne 6",res.data?.accessList)
        
        dispatch({
          type: SET_CURRENT_ACCESS_LIST,
          payload: res.data?.accessList
        })
       
      dispatch({
        type:SET_IS_SECCESS,
        payload:true
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


export const GetAllusersWhoHaveAtLeastOneSameAccessCode =() => (dispatch)=>{
  axios.get(`https://xgenboxv2.onrender.com/api/users/access/getAllUserWhoHasASameAccessBin`)
      .then(async(res) => {
        // console.log("ligne 6",res.data?.accessList)
        
        dispatch({
          type: SET_SOME_ACCESS_LIST_USERS,
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

export const reportOnUser = (data)=> (dispatch)=>{

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
  axios.post(`https://xgenboxv2.onrender.com/api/users/createReport`,
  data,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  }
  )
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
    dispatch({
      type:SET_IS_SECCESS,
      payload:false
    })
    }
         
      )
}

export const CreateSupport = (data)=> (dispatch)=>{

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
  axios.post(`https://xgenboxv2.onrender.com/api/users/createSupport`,
  data,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  }
  )
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
    dispatch({
      type:SET_IS_SECCESS,
      payload:false
    })
    }
         
      )
}

export const CreateFeedback = (data)=> (dispatch)=>{

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
  axios.post(`https://xgenboxv2.onrender.com/api/users/createFeedback`,data)
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
    dispatch({
      type:SET_IS_SECCESS,
      payload:false
    })
    }
         
      )
}