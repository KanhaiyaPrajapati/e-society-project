import axios from "axios";
import { GETAPI, GETBLOCKAPIDATA, GETBLOCKSAPI, GETMANAGERAPIDATA, GETPROPERTYID } from "../type/type";

let token = JSON.parse(localStorage.getItem("token"));
const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
console.log(auth);

//----------------------------------------------------------- UsersApis Starts Here -----------------------------------------------

export const getapi = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8000/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          managerId: 1,
        }
      })
      .then((res) => {
        dispatch({ type: GETAPI, data: res.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const addapidata = (obj, auth) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/api/user/admin-create", obj, auth)
      .then((res) => {
        console.log(res.data);
        dispatch(getapi(auth)); //auth not stay
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const DeleteApidata = (id, auth) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/api/user/${id}`, auth)
      .then((res) => {
        console.log(res.data);
        dispatch(getapi(auth));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const EditApiData = (obj, auth) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8000/api/user/${obj.id}`, obj, auth)
      .then((res) => {
        console.log(res.data);
        dispatch(getapi(auth));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const ViewApiData = (id, setLgShow, setViewedUser) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8000/api/user/${id}`, auth)
      .then((res) => {
        console.log(res.data);
        setViewedUser(res.data);
        setLgShow(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
//------------------------------ UsersApis Ends Here -----------------------------------------------

//------------------------------ PropertyApis Starts Here -----------------------------------------------

export const PropertgetApi = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/api/property/available/property", auth)
      .then((res) => {
        dispatch({ type: GETPROPERTYID, data: res.data.inactiveProperties });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const AddPropertyApiData = (obj, auth) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://localhost:8000/api/property/create",
        obj,
        auth
      );
      console.log(response.data);
      dispatch(PropertgetApi());
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const DeletePropertApi = (id, auth) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `http://localhost:8000/api/property/${id}`,
        auth
      );
      console.log(response.data);
      dispatch(PropertgetApi(auth));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const ViewPropertApiData = (id, setLgShow, setpropertviewApi) => {
  return async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/api/property/${id}`,
        auth
      );
      console.log(response.data.property);
      let data = response.data.property;
      let lsk = localStorage.setItem("propertydata", JSON.stringify(data));
      console.log(lsk);
      setpropertviewApi(data);
      setLgShow(true);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const EditPropertyApidata = (obj, auth) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `http://localhost:8000/api/property/${obj.id}`,
        obj,
        auth
      );
      console.log(response.data);
      dispatch(PropertgetApi(auth));
    } catch (error) {
      console.log(error.response);
    }
  };
};
//------------------------------ PropertyApis Ends Here -------------------------------------------------------

//------------------------------ BlocksApis Starts Here -------------------------------------------------

export const getBlockApi = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:8000/api/blocks/", auth);
      console.log(response.data.blocks);
      dispatch({ type: GETBLOCKSAPI, data: response.data.blocks });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const AddPropertyBlockApiData = (obj, auth) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://localhost:8000/api/blocks/create",
        obj,
        auth
      );
      console.log(response.data);
      dispatch(getBlockApi());
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const DeletePropertyBlockApiData = (id, auth) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `http://localhost:8000/api/blocks/${id}`,
        auth
      );
      console.log(response.data);
      dispatch(getBlockApi(auth));
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const ViewPropertyBlockApiData = (id, setLgShow, setviewapidata) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `http://localhost:8000/api/blocks/${id}`,
        auth
      );
      console.log(response.data.blocks);
      setviewapidata(response.data.blocks);
      setLgShow(true);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const UpdatePropertyBlockApiData = (obj, auth) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/blocks/${obj.id}`,
        obj,
        auth
      );
      console.log(response.data);
      dispatch(getBlockApi(auth));
    } catch (error) {
      console.log(error.response);
    }
  };
};

//------------------------------ BlocksApis Ends Here -------------------------------------------------

//------------------------------ UnitsApis Starts Here ------------------------------------------------

export const getUnitsapi = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:8000/api/units/", auth);
      console.log(response.data.units);
      dispatch({ type: GETBLOCKAPIDATA, data: response.data.units });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const AddUnitsApiData = (obj, auth) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://localhost:8000/api/units/create",
        obj,
        auth
      );
      console.log(response.data);
      dispatch(getUnitsapi());
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const DeleteUnitsApiData = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `http://localhost:8000/api/units/${id}`,
        auth
      );
      console.log(response.data);
      dispatch(getUnitsapi(auth));
    } catch (error) {
      console.log(error.response);
    }
  };
};
//axios async await try,catch  Best Way
// export const ViewUnitsApiData = (id, setLgShow, setsingleunit) => {
//   return async (dispatch) => {
//     try {
//       let response = await axios.get(`http://localhost:8000/api/units/${id}`, auth);
//       console.log(response.data);
//       setsingleunit(response.data)
//       setLgShow(true)
//     } catch (error) {
//       console.log(error.response);
//     }
//   }
// }
//with async await try,catch and fetch api
// export const ViewUnitsApiData = (id, setLgShow, setsingleunit) => {
//   return async () => {
//     try {
//       let res = await fetch(`http://localhost:8000/api/units/${id}`, auth);
//       let data = await res.json();
//       console.log(data);
//       setLgShow(true);
//       setsingleunit(data);
//     } catch (error) {
//       console.log(error.res);
//     }
//   };
// };

// Without async await used then

export const ViewUnitsApiData = (id, setLgShow, setsingleunit) => {
  return () => {
    try {
      axios.get(`http://localhost:8000/api/units/${id}`, auth).then((res) => {
        console.log(res.data);
        setLgShow(true)
        setsingleunit(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }
}

//--------------------------------------------- UnitsApis Ends  Here ------------------------------------------------

// ===================================== Manager Handler Api Starts From Here ===========================


export const getManagerallapidata = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:8000/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          managerId: 5,
        }
      });
      console.log(res.data);
      dispatch({ type: GETMANAGERAPIDATA, data: res.data })

    } catch (error) {
      console.log(error);
    }
  }
}

export const AddMAnagerAPiData = (obj, auth, getManagerallapidata) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`http://localhost:8000/api/user/manager-create`, obj, auth);
      console.log(res.data.user);
      console.log(res.user);
      dispatch(getManagerallapidata())
    } catch (error) {
      console.log(error);
    }
  }
}

export const UpdateManagerApiData = (obj, auth) => {
  return async (dispatch) => {
    try {
      let res = await axios.put(`http://localhost:8000/api/user/managerupdate/${obj.id}`, obj, auth);
      console.log(res.data);
      dispatch(getManagerallapidata(auth))
    } catch (error) {
      console.log(error);
    }
  }
}



export const DeleteManagerApiData = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`http://localhost:8000/api/user/${id}`, auth);
      console.log(res.data);
      dispatch(getManagerallapidata(auth))
    } catch (error) {
      console.log(error);
    }
  }
}


// ===================================== Manager Handler Api Ends From Here =======================================



