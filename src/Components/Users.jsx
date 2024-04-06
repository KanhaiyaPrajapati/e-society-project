import React, { useEffect, useState } from "react";
import { Hoc } from "./Hoc";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from "react-redux";
import { AddMAnagerAPiData, DeleteApidata, DeleteManagerApiData, EditApiData, UpdateManagerApiData, ViewApiData, addapidata, getapi } from "../Redux/action/action";
import Swal from "sweetalert2";
import UsersignupValidation from '../UserSignupValidation.json'
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { Link, Outlet } from "react-router-dom";

function Users() {
  const [lgShow, setLgShow] = useState(false);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [viewedUser, setViewedUser] = useState('');
  let   [obj, setobj] = useState({ firstName: '', lastName: '', email: '', phone: '', role: '', propertyId: '', blockId: '', unitId: '', managerId: '' })
  let   [blankobj, setblankobj] = useState({})
  const [show, setShow] = useState(false);
  const [searchInput, setsearchInput] = useState('')
  let checkAlphabet = /^[a-zA-Z0-9]+$/;
  const [errorMsg, seterrorMsg] = useState({})
  const [ShowManagerdata, setShowManagerdata] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(viewedUser);
  let dispatch = useDispatch()

  let state = useSelector((state) => state.api)
  console.log(state);


  let state1 = useSelector((state) => state.ManagerApi);
  console.log(state1);

  let token = JSON.parse(localStorage.getItem('token'));
  console.log(token);

  let GetLoginAdminMangerResponse = JSON.parse(localStorage.getItem('LoginRes'));
  let condition = GetLoginAdminMangerResponse.userRole;
  console.log(condition);


  const handleSearchInputChange = (e) => {
    setsearchInput(e.target.value)
  }

  const filteredDataForAdminUser = state.filter((user) =>
    user.userName.toLowerCase().includes(searchInput.toLowerCase())
  );


  const filteredDataForManagerUser = state1.filter((user) =>
    user.firstName.toLowerCase().includes(searchInput.toLowerCase())
  );

    const auth = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fecthingdata = async () => {
      try {
        const Response = await axios.get('http://localhost:8000/api/property/available/property', auth);
        console.log(Response.data.inactiveProperties);
        setPropertyOptions(Response.data.inactiveProperties)
      } catch (error) {
        console.log(error);
      }
    }
    fecthingdata()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, [])

  // Error Handling Function

  let ValidationFunction = (name) => {
    let validationobj = UsersignupValidation.find((x) => x.name === name)
    let Isvalid = validationobj?.conditions?.find((x) => eval(x.condition))
    if (Isvalid) {
      errorMsg[name] = Isvalid.error;
    }
    else {
      delete errorMsg[name]
    }
    seterrorMsg({ ...errorMsg })
  }

  // Get Value Function

  const getvalue = (e) => {
    if (e.target.type === 'propertyId') {
      obj[e.target.name] = Array.from(e.target.selectedOptions,(option) => option.value)
    }
    else {
      obj[e.target.name] = e.target.value;
      blankobj[e.target.name] = '';

    }
    console.log(obj);
    setobj({ ...obj })
    setblankobj({ ...blankobj })
    ValidationFunction(e.target.name)
  }
  //======================================== Function for Admin Panel =============================

  let SubmitAdminData = async () => {
    try {
      await Promise.all(Object.keys(obj).map(async (x) => {
        await ValidationFunction(x);
      }));
  
      if (Object.keys(errorMsg).length === 0) {
        if (obj.id === undefined) {
          dispatch(addapidata(obj, auth));
        } else {
          dispatch(EditApiData(obj, auth));
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setobj({ ...blankobj });
      } else {
        console.log('Validation errors:', errorMsg);
      }
    } catch (error) {
      console.error('Error in SubmitAdminData:', error);
      // Handle error here, if needed
    }
    handleClose();
  };
  
  


  const deleteData = (id) => {
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
        dispatch(DeleteApidata(id, auth))
      }
    });
    console.log(dispatch);
  }

  const Editdata = (data) => {
    obj = ({ ...data })
    console.log(obj);
    setobj({ ...obj })
    handleShow()
  }

  const viewdata = (id) => {
    dispatch(ViewApiData(id, setLgShow, setViewedUser))
  };


  //============================================== Function for Manager Panel =============================

  let SubmitManagerData = async () => {
    await Promise.all(Object.keys(obj).map(async (x) => {
      await ValidationFunction(x);
    }))
    if (Object.keys(errorMsg).length === 0) {
      if (obj.id === undefined) {
        dispatch(AddMAnagerAPiData(obj, auth))
      } else {
        dispatch(UpdateManagerApiData(obj, auth));
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2500
      });
      setobj({ ...blankobj });
      handleClose();
    }
  };

  let EditManagerData = (obj) => {
    obj = ({ ...obj })
    console.log(obj);
    setobj({ ...obj })
    handleShow()
  }


  let deleteManagerData = (id, auth) => {
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
        dispatch(DeleteManagerApiData(id, auth))
      }
    });
  }

  //============================================ Function End for Manager Panel =====================================

  const userRole = obj.role;

  return (
    <>
      {/*============================================ Admin Table and Form ============================================= */}
  
      {condition === 'Admin' && (
        // Render Admin Table and Form
        <div className="shadow-lg mx-auto mt-5 border border-warning" style={{ width: "90%" }} data-aos='zoom-in-up' >
          <div className=" d-flex justify-content-between px-1 py-3 lx " >
            <div>
  
              <h4 className="ms-3 ">Users<span className="ms-2">{state.length}</span></h4>
            </div>
            <div className="px-5 d-flex ">
              <input type="text" className="form-control rounded text-center me-3" placeholder="Search" style={{ width: "120px" }} onChange={handleSearchInputChange} />
              <button className="btn btn-dark" style={{ width: "70px" }} onClick={handleShow}>
                <PersonAddAltSharpIcon />
              </button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Admin SignUp Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Admin Form JSX */}
                  <form action="">
                    <div>
                      <input type="text" name="firstName" id="" placeholder="FirstName" className="form-control" onChange={getvalue} value={obj.firstName} />
                      <span className='text-center error_msg'>{errorMsg?.firstName}</span>
                    </div>
                    <div className="mt-4">
                      <input type="text" name="lastName" id="" placeholder="lastName" className="form-control" onChange={getvalue} value={obj.lastName} />
                      <span className='text-center error_msg'>{errorMsg?.lastName}</span>
                    </div>
                    <div className="mt-4">
                      <input type="email" name="email" id="" placeholder="email" className="form-control" onChange={getvalue} value={obj.email} />
                      <span className='text-center error_msg'>{errorMsg?.email}</span>
                    </div>

                    <div className="mt-4">
                      <input type="number" name="phone" id="" placeholder="phone" className="form-control" onChange={getvalue} value={obj.phone} />
                      <span className='text-center error_msg'>{errorMsg?.phone}</span>
                    </div>
                    <div className="mt-4">
                      <select name="role" id="" className="form-select" onChange={getvalue} value={obj.role} >
                        <option value="">--User Role--</option>
                        <option value="ADMIN"> ADMIN</option>
                        <option value="Manager">Manager</option>
                      </select>
                      <span className='text-center error_msg'>{errorMsg?.role}</span>
                    </div>

                    <div className="mt-4">
                      <select name="propertyId" id="" className="form-select" onChange={getvalue} value={obj.propertyId}  >
                        <option value="">-Properties-</option>
                        {
                          propertyOptions.map((x) => {
                            return <option key={x.id} value={x.id}>
                              {x.id}
                            </option>
                          })
                        }
                      </select>
                      <span className='text-center error_msg'>{errorMsg?.propertyId}</span>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="warning" type="button" onClick={SubmitAdminData}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <DataTable className="datatable px-3 py-3 text-dark" value={filteredDataForAdminUser} paginator rows={5} rowsPerPageOptions={[3, 5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }}>
            {/* Admin Table Columns */}
            <Column field="id" header="ID" style={{ width: '10%' }}></Column>
            <Column field="userName" header="User Name" style={{ width: '20%' }}></Column>
            <Column field="email" header="Email" style={{ width: '20%' }}></Column>
            <Column field="phone" header="PHONE" style={{ width: '15%' }}></Column>
            <Column field="role" header="ROLE" style={{ width: '15%' }}></Column>
            <Column field="propertyId" header="PropId" style={{ width: '10%' }}></Column>
            <Column header="ACTIONS" style={{ width: '25%' }} body={(rowData) => (
              <div>
                <EditIcon className="text-primary" style={{ cursor: 'pointer' }} onClick={() => Editdata(rowData)} />
                <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: 'pointer' }} onClick={() => deleteData(rowData.id)} />
                <VisibilityIcon className="ms-2" style={{ cursor: 'pointer' }} onClick={() => viewdata(rowData.id)}></VisibilityIcon>
              </div>
            )}>
            </Column>
          </DataTable>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                User Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-between px-5 py-3 gap-3 main-container mt-3">
                <div className="table heading-table">
                  <h5 style={{ color: '#f30a49' }}>Property ID</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">FirstName</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">LastName</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">Email</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">Phone</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">Role</h5>
                </div>
                <div>
                  <h5>{viewedUser.propertyId}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.firstName}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.lastName}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.email}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.phone}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.role}</h5>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}

   {/*============================================ Manager Table and Form ============================================= */}

      {condition === 'Manager' && (
        // Render Manager Table and Form
        <div className="shadow-lg mx-auto mt-5 border border-warning" style={{ width: "90%" }} data-aos='zoom-in-up' >
          <div className=" d-flex justify-content-between px-1 py-3 lx " >
            <div>
              <h4 className="ms-3 ">Users</h4>
            </div>
            <div className="px-5 d-flex ">
              <input type="text" className="form-control rounded text-center me-3" placeholder="Search" style={{ width: "120px" }} onChange={handleSearchInputChange} />
              <button className="btn btn-dark" style={{ width: "70px" }} onClick={handleShow}>
                <PersonAddAltSharpIcon />
              </button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Services Add SignUp Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Manager Form JSX */}
                  <form action="">
                    <div className="mt-1">
                      <input type="text" name="firstName" id="" placeholder="FirstName" className="form-control" onChange={getvalue} value={obj.firstName} />
                      <span className='text-center error_msg ms-2'>{errorMsg?.firstName}</span>
                    </div>
                    <div className="mt-1">
                      <input type="text" name="lastName" id="" placeholder="lastName" className="form-control" onChange={getvalue} value={obj.lastName} />
                      <span className='text-center error_msg ms-2'>{errorMsg?.lastName}</span>
                    </div>
                    <div className="mt-1">
                      <input type="email" name="email" id="" placeholder="email" className="form-control" onChange={getvalue} value={obj.email} />
                      <span className='text-center error_msg ms-2' >{errorMsg?.email}</span>
                    </div>

                    <div className="mt-1">
                      <input type="number" name="phone" id="" placeholder="phone" className="form-control" onChange={getvalue} value={obj.phone} />
                      <span className='text-center error_msg ms-2'>{errorMsg?.phone}</span>
                    </div>

                    <div className="mt-1">
                      <select name="role" id="" className="form-select" onChange={getvalue} value={obj.role} >
                        <option value="">--User Role--</option>
                        <option value="Tenant">Tenant</option>
                        <option value="Workers">Workers</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                      </select>
                      <span className='text-center error_msg ms-2'>{errorMsg?.role}</span>
                    </div>

                    <div className="mt-1">
                      <select name="propertyId" id="" className="form-select" onChange={getvalue} value={obj.propertyId}  >
                        <option value="">-Properties-</option>
                        {
                          propertyOptions.map((x) => {
                            return <option key={x.id} value={x.id}>
                              {x.id}
                            </option>
                          })
                        }
                      </select>
                      <span className='text-center error_msg ms-2'>{errorMsg?.propertyId}</span>
                    </div>

                    <div className="mt-1">
                      <input type="number" name="blockId" id="" placeholder="blockId" className="form-control" onChange={getvalue} value={obj.blockId} />
                      <span className='text-center error_msg ms-2'>{errorMsg?.blockId}</span>
                    </div>

                    <div className="mt-1">
                      <input type="number" name="unitId" id="" placeholder="unitId" className="form-control" onChange={getvalue} value={obj.unitId} />
                      <span className='text-center error_msg ms-2'>{errorMsg?.unitId}</span>
                    </div>

                    <div className="mt-1">
                      <input type="number" name="managerId" id="" placeholder="managerId" className="form-control" onChange={getvalue} value={obj.managerId} />
                      <span className='text-center error_msg ms-2'>{errorMsg?.managerId}</span>
                    </div>

                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="button" onClick={SubmitManagerData}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <DataTable className="datatable px-3 py-3 text-dark" value={filteredDataForManagerUser} paginator rows={5} rowsPerPageOptions={[3, 5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }}>
            {/* Manager Table Columns */}
            <Column field="id" header="ID" style={{ width: '5%' }}></Column>
            <Column field="firstName" header="FirstName" style={{ width: '10%' }}></Column>
            <Column field="lastName" header="LastName" style={{ width: '10%' }}></Column>
            <Column field="email" header="Email" style={{ width: '10%' }}></Column>
            <Column field="phone" header="PHONE" style={{ width: '10%' }}></Column>
            <Column field="role" header="ROLE" style={{ width: '10%' }}></Column>
            <Column field="propertyId" header="PropertyId" style={{ width: '7%' }}></Column>
            <Column field="blockId" header="BlockId" style={{ width: '5%' }}></Column>
            <Column field="unitId" header="UnitId" style={{ width: '5%' }}></Column>
            <Column field="managerId" header="ManagerId" style={{ width: '7%' }}></Column>
            {/* <Column field="propertyId" header="PropId" style={{ width: '10%' }}></Column> */}
            <Column header="ACTIONS" style={{ width: '10%' }} body={(rowData) => (
              <div>
                <EditIcon className="text-primary" style={{ cursor: 'pointer' }} onClick={() => EditManagerData(rowData)} />
                <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: 'pointer' }} onClick={() => deleteManagerData(rowData.id)} />
                <VisibilityIcon className="ms-2" style={{ cursor: 'pointer' }} onClick={() => viewdata(rowData.id)}></VisibilityIcon>
              </div>
            )}>
            </Column>
          </DataTable>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                User Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-between px-5 py-3 gap-3 main-container mt-3">
                <div className="table heading-table">
                  <h5 style={{ color: '#f30a49' }}>Property ID</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">FirstName</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">LastName</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">Email</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">Phone</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">Role</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">PropertyId</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">BlockId</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">UnitId</h5>
                  <h5 style={{ color: '#f30a49' }} className="mt-4">ManagerId</h5>
                </div>
                <div>
                  <h5>{viewedUser.propertyId}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.firstName}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.lastName}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.email}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.phone}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.role}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.propertyId}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.blockId}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.unitId}</h5>
                  <h5 style={{ color: '#090030' }} className="mt-4">{viewedUser.managerId}</h5>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Hoc(Users);
