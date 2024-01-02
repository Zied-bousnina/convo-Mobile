/* eslint-disable prettier/prettier */
import axios from "axios"
import { SET_BASIC_INFO, SET_CURRENT_ACCESS_LIST, SET_CURRENT_USER, SET_CURRENT_USER2, SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS, SET_SOME_ACCESS_LIST_USERS } from "../types"
import { setLoading } from "./authActions"
import { socket } from "../../../socket"

export const GetCurrentAccessList =  () => (dispatch) => {
  axios.get(`https://xgenboxv2.onrender.com/api/users/access/getCurrentAccessList`)
      .then(async(res) => {



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

    }

      )
}


export const GetAllusersWhoHaveAtLeastOneSameAccessCode =() => (dispatch)=>{
  axios.get(`https://xgenboxv2.onrender.com/api/users/access/getAllUserWhoHasASameAccessBin`)
      .then(async(res) => {



        dispatch({
          type: SET_SOME_ACCESS_LIST_USERS,
          payload: res.data
        })
      })
      .catch( (err) =>{

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


export const AddBasicInfo =  (userData, navigation ) => (dispatch) => {

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`https://convoyage.onrender.com/api/basicInfo`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {

        // dispatch(CreateScore())

        dispatch({
          type: SET_BASIC_INFO,
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
export const AddCurrentLocation =  (userData, navigation ) => (dispatch) => {



  axios.post(`https://convoyage.onrender.com/api/users/AddAddress`, userData,)
      .then(async(res) => {


      })
      .catch( (err) =>{


      }

      )
}
export const findBasicInfoByUserId =(dispatch) => ()=>{
  axios.get(`https://convoyage.onrender.com/api/basicInfo/findBasicProfileById`)
      .then(async(res) => {


        dispatch({
          type: SET_BASIC_INFO,
          payload: res.data
        })
      })
      .catch( (err) =>{

    }

      )
}
export const GetCurrentUser = (navigation)=>dispatch=>{

  axios.get(`https://convoyage.onrender.com/api/users/users/currentUser`)
  .then(res => {
      // console.log(res)
      dispatch({
          type: SET_CURRENT_USER2,
          payload: res?.data
      })
console.log(res?.data?.user?._id)
socket.on('connect', () => {
  console.log('Connected to server');
  // if(currentUser){



      // socket.emit('clientData', { message: "res?.data?.user?._id" });

  // }
});

      // dispatch(registerGoogleUser(data))

      // dispatch(loginUser(data))
  })
  .catch(err =>
     {
      // console.log("err in authAction.js line 366",err)
      dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      // dispatch(registerGoogleUser(data))
      throw err
  }
  )
}
export const ChangeStatus = (data)=> (dispatch)=>{

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})
dispatch({
  type:SET_IS_SECCESS,
  payload:false
})
  axios.post(`https://convoyage.onrender.com/api/users/SetUserStatus`,data)
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

export const getUsersById =() => (dispatch)=>{
  axios.get(`https://convoyage.onrender.com/api/users/getUsersById`)
      .then(async(res) => {


        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data?.user
        })
      })
      .catch( (err) =>{

    }

      )
}
