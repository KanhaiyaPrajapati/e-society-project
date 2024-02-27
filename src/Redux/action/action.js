import axios from "axios"
import { GETAPI } from "../type/type"

let token = JSON.parse(localStorage.getItem('token'));
const auth = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export const getapi = () =>{
  return (dispatch) =>{
    axios.get("http://localhost:8000/api/user/", auth).then((res)  => {
      dispatch({type:GETAPI,data:res.data})
    }).catch((err) => {
      console.log(err.response);
    });
  }
}

export const addapidata = (obj,auth) =>{
  return (dispatch) =>{
    axios.post("http://localhost:8000/api/user/admin-create",obj,auth).then((res) => {
      console.log(res.data);
      dispatch(getapi())//auth not stay
    }).catch((err) => {
      console.log(err.response);
    });
  }
}

export const DeleteApidata = (id,auth) =>{
  return (dispatch) =>{
    axios.delete(`http://localhost:8000/api/user/${id}`,auth).then((res) => {
      console.log(res.data);
      dispatch(getapi(auth))
    }).catch((err) => {
      console.log(err.response);
    });
  }
}

export const EditApiData = (obj,auth) =>{
  return (dispatch) =>{
    axios.put(`http://localhost:8000/api/user/${obj.id}`,obj,auth).then((res) => {
      console.log(res.data);
      dispatch(getapi(auth))
  }).catch((err) => {
  console.log(err.response);
});
  }
}

export const ViewApiData = (id,setLgShow,setViewedUser) =>{
return (dispatch) =>{
     axios.get(`http://localhost:8000/api/user/${id}`,auth).then((res) => {
      console.log(res.data);
      setViewedUser(res.data)
      setLgShow(true)
    }).catch((err) => {
      console.log(err.response);
     });
   }
}




