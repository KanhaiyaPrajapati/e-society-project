import React, { useEffect, useState } from "react";
import { Hoc } from "./Hoc";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from "react-redux";
import { GETAPI } from "../Redux/type/type";
import { DeleteApidata, EditApiData, ViewApiData, addapidata, getapi } from "../Redux/action/action";
import Swal from "sweetalert2";

function Users() {
 const [smShow, setSmShow] = useState(false);
 const [viewedUser, setViewedUser] = useState('hello');
 let [obj, setobj] = useState({})
 let [blankobj, setblankobj] = useState({})
 const [show, setShow] = useState(false);
 const [searchInput, setsearchInput] = useState('')
 
 const handleClose = () => setShow(false);
 const handleShow =  () => setShow(true);

 let state = useSelector((state)=>state.api)
 let dispatch = useDispatch()
 console.log(state);


 let token = JSON.parse(localStorage.getItem('token'));
 console.log( 'Token:' + token);

const handleSearchInputChange = (e) =>{
  setsearchInput(e.target.value)
}

const filteredData = state.filter((user) =>
user.userName.toLowerCase().includes(searchInput.toLowerCase())
);

const auth = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

useEffect(() => {
    dispatch(getapi(auth));
},[]);

   const getvalue = (e) =>{
    if(e.target.type === 'propertyId'){
      obj[e.target.name] = Array.from(e.target.selectedOptions, (option) => option.value)
    }
    else{
      obj[e.target.name]=e.target.value;
      blankobj[e.target.name] = '';

    }
    console.log(obj);
    setobj({...obj})
    setblankobj({...blankobj})
  }

  let SubmitData = () =>{
    if(obj.id){
      dispatch(EditApiData(obj,auth))
    }
    else{
      dispatch(addapidata(obj,auth))
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    
    console.log(obj);
    setobj({...obj})
    obj = ({...blankobj})
    handleClose()
  }

  const deleteData = (id) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        dispatch(DeleteApidata(id,auth))
      }
    });
    console.log(dispatch);
  }

  const Editdata = (data) =>{
    obj=({...data})
    console.log(obj);
    setobj({...obj})
    handleShow()
  }

  const viewdata = (id) => {
    dispatch(ViewApiData(id))
  };
  
return (
    <>
      <div className="shadow-lg  mx-auto mt-5" style={{ width: "90%" }}>
        <div className=" d-flex justify-content-between px-1 py-3">
          <div>
            <h4 className="ms-3">Users</h4>
          </div>
          <div className="px-5 d-flex ">
            <input type="text" className="form-control rounded text-center me-3" placeholder="Search" style={{ width: "120px" }} onChange={handleSearchInputChange}/>
            <button className="btn btn-danger" style={{ width: "80px" }} onClick={handleShow}>
              <PersonAddAltIcon/>
            </button>
          
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>SignUp Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <form action="">
                      <div>
                          <input type="text" name="firstName" id="" placeholder="FirstName" className="form-control" onChange={getvalue} value={obj.firstName}/>
                      </div>
                      <div className="mt-4">
                          <input type="text" name="lastName" id="" placeholder="lastName" className="form-control" onChange={getvalue} value={obj.lastName}/>
                      </div>
                      <div className="mt-4">
                          <input type="email" name="email" id="" placeholder="email" className="form-control" onChange={getvalue} value={obj.email}/>
                      </div>

                      <div className="mt-4">
                          <input type="number" name="phone" id="" placeholder="phone" className="form-control" onChange={getvalue} value={obj.phone}/>
                      </div>
                      <div className="mt-4">
                        <select name ="role" id="" className="form-select" onChange={getvalue} value={obj.role} >
                          <option value = "">--User Role--</option>
                          <option value="ADMIN"> ADMIN</option>
                          <option value="Manager">Manager</option>
                        </select>
                      </div>
                     
                      <div className="mt-4">
                      <select name ="propertyId" id="" className="form-select" onChange={getvalue} value={obj.propertyId}  >
                          <option value = "">-Properties-</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>

                    </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="button" onClick={SubmitData}>
                  Submit
                </Button>
              </Modal.Footer>
          </Modal>

          </div>
        </div>

  <DataTable className="datatable px-3 py-3 text-dark" value = {filteredData} paginator rows={5} rowsPerPageOptions={[3,5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }}>
    <Column field="id" header="ID" style={{ width: '10%' }}></Column>
    <Column field="userName" header="User Name" style={{ width: '15%' }}></Column>
    <Column field="email" header="Email" style={{ width: '20%' }}></Column>
    <Column field="phone" header="PHONE" style={{ width: '20%' }}></Column>
    <Column field="role" header="ROLE" style={{ width: '15%' }}></Column>
    <Column field="propertyId" header="PropId" style={{ width: '10%' }}></Column>
    <Column header="ACTIONS" style={{ width: '25%' }} body={(rowData) => (
      <div>
          <EditIcon className="text-primary" style={{cursor:'pointer'}} onClick ={()=>Editdata(rowData)}  />
          <DeleteForeverIcon className="text-danger ms-2" style={{cursor:'pointer'}} onClick ={()=>deleteData(rowData.id)} />
          <VisibilityIcon className="ms-2" style={{cursor:'pointer'}} onClick = {()=>viewdata(rowData.id)}></VisibilityIcon>
      </div>
    )}>
  </Column>
</DataTable>



      


</div>
    </>
  );
}
export default Hoc(Users);
