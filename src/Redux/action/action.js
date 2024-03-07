import axios from "axios"
import { GETAPI, GETBLOCKAPIDATA, GETBLOCKSAPI, GETPROPERTYID } from "../type/type"

let token = JSON.parse(localStorage.getItem('token'));
const auth = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}
console.log(auth);

//------------------------------ UsersApis Starts Here -----------------------------------------------

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
//------------------------------ UsersApis Ends Here -----------------------------------------------

//------------------------------ PropertyApis Starts Here -----------------------------------------------

export const PropertgetApi = () =>{
  return(dispatch)=>{
    axios.get('http://localhost:8000/api/property/available/property',auth).then((res)=>{
    dispatch({type:GETPROPERTYID, data:res.data.inactiveProperties})
    }).catch((err)=>{
      console.log(err.response);
    })
  }
}

export const AddPropertyApiData = (auth,formdata) =>{
  return async (dispatch)=>{
   try{
    let response = await axios.post('http://localhost:8000/api/property/create',formdata,auth);
    console.log(response.data);
    dispatch(PropertgetApi())
   } catch(error){
    console.log(error.response);
   }
  }
}

export const DeletePropertApi = (id,auth) =>{
 return async (dispatch) =>{
  try{
    let response = await axios.delete(`http://localhost:8000/api/property/${id}`,auth);
    console.log(response.data);
    dispatch(PropertgetApi(auth))
  }catch(err){
    console.log(err.response);
  }
 }
}

export const ViewPropertApiData = (id, setLgShow, setpropertviewApi) =>{
  return async () =>{
    try{
      let response = await axios.get(`http://localhost:8000/api/property/${id}`,auth)
      console.log(response.data.property);
      let data = response.data.property;
      let lsk = localStorage.setItem('propertydata',JSON.stringify(data))
      console.log(lsk);
      setpropertviewApi(data);
      setLgShow(true)
     }catch(error){
      console.log(error.response);
    }
  }
}

export const EditPropertyApidata = () =>{
  return async (dispatch)=>{
    try{
      let response = await axios.put('http://localhost:8000/api/property/',auth);
      console.log(response.data);
      dispatch(PropertgetApi(auth))
    }catch(error){
      console.log(error.response);
    }
  }
}
//------------------------------ PropertyApis Ends Here -------------------------------------------------------

//------------------------------ BlocksApis Starts Here -------------------------------------------------

export const getBlockApi = () =>{
  return async (dispatch) =>{
    try{
      let response = await axios.get('http://localhost:8000/api/blocks/',auth);
      console.log(response.data.blocks);
      dispatch({type:GETBLOCKSAPI,data:response.data.blocks});
     }catch(error){
      console.log(error.response);
    } 
  }
}

export const AddPropertyBlockApiData = (obj,auth) =>{
  return async (dispatch) =>{
    try{
      let response = await axios.post('http://localhost:8000/api/blocks/create',obj,auth);
      console.log(response.data);
      dispatch(getBlockApi(auth))
      }catch(error){
      console.log(error.response);
    }
  }
}

export const DeletePropertyBlockApiData = (id,auth) =>{
  return async (dispatch) =>{
    try{
      let response = await axios.delete(`http://localhost:8000/api/blocks/${id}`,auth);
      console.log(response.data);
      dispatch(getBlockApi(auth)) 
    }catch(error){
      console.log(error.response);
    }
  }
}

export const ViewPropertyBlockApiData = (id,setLgShow,setviewapidata) =>{
  return async (dispatch)=>{
    try{
      let response = await axios.get(`http://localhost:8000/api/blocks/${id}`,auth);
      console.log(response.data.blocks);
      setviewapidata(response.data.blocks)
      setLgShow(true)
    }catch(error){
      console.log(error.response);
    }
  }
}

export const UpdatePropertyBlockApiData = (obj,auth) =>{
  return async (dispatch) =>{
    try{
      const response = await axios.put(`http://localhost:8000/api/blocks/${obj.id}`,obj,auth);
      console.log(response.data);
      dispatch(getBlockApi(auth))
    }catch(error){
      console.log(error.response);
    } 
  }
}

//------------------------------ BlocksApis Ends Here -------------------------------------------------

//------------------------------ UnitsApis Starts Here ------------------------------------------------


export const getUnitsapi = () =>{
  return async (dispatch)=>{
    try{  
      let response = await axios.get('http://localhost:8000/api/units/',auth);
      console.log(response.data.units);
      dispatch({type:GETBLOCKAPIDATA,data:response.data.units})
    }catch(error){
      console.log(error.response);
    }
  }
}


export const DeleteUnitsApiData = (id) =>{
  return async (dispatch)=>{
    try{
        let response = await axios.delete(`http://localhost:8000/api/units/${id}`,auth);
        console.log(response.data);
        dispatch(getUnitsapi(auth))
      }catch(error){
      console.log(error.response);
    }
  }
}



export const ViewUnitsApiData = (id,setLgShow,setsingleunit) => {
  return async (dispatch) =>{
    try{
      let response = await axios.get(`http://localhost:8000/api/units/${id}`,auth);
      console.log(response.data);
      setsingleunit(response.data)
      setLgShow(true)
    }catch(error){
      console.log(error.response);
    }
  }
} 












