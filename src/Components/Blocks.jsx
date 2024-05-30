import React, { useEffect, useState } from 'react'
import { Hoc } from './Hoc'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ApartmentIcon from '@mui/icons-material/Apartment';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { NavLink, json } from 'react-router-dom';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import icons from '../images/Property.png'
import AddIcon from '@mui/icons-material/Add';
import { AddPropertyBlockApiData, DeletePropertyBlockApiData, UpdatePropertyBlockApiData, ViewPropertyBlockApiData } from '../Redux/action/action';


function Blocks() {
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [getallproperty, setgetallproperty] = useState([])
  const [viewapidata, setviewapidata] = useState('')
  const [blockobj, setblockobj] = useState({
    blocks_name: '',
    propertyId: '',
  });
  let state = useSelector((state) => state.Blockapi)
  console.log(state);
  let dispatch = useDispatch()

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  let token = JSON.parse(localStorage.getItem("token"));

  let auth = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  const filteredData = state.filter((user) =>
    user.blocks_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setsearchInput(e.target.value);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/property/available/property', auth).then((res) => {
      console.log(res.data.inactiveProperties);
      setgetallproperty(res.data.inactiveProperties)
    }).catch((err) => {
      console.log(err.res);
    })
  }, [])

  const BlockApiValidation = Yup.object({
    blocks_name: Yup.string().min(3).required('Please Select Block Name'),
    propertyId: Yup.string().required('Please Select Property Id')
  })

  const AddPropertyBlockApi = async (obj) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 2500
    });
    if (obj.id === undefined) {
      await dispatch(AddPropertyBlockApiData(obj, auth))
    }
    else {
      await dispatch(UpdatePropertyBlockApiData(obj, auth))
    }
    handleClose()
  }

  const DeletePropertyBlockApi = (id) => {
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
        dispatch(DeletePropertyBlockApiData(id, auth))
      }
    });
  }
  const ViewPropertyBlockApi = (id) => {
    dispatch(ViewPropertyBlockApiData(id, setLgShow, setviewapidata))
  }

  const UpdatePropertyBlockApi = (obj) => {
    setblockobj(obj);
    handleShow()
  }
  
  return (
    <>
      <div
        className="shadow-lg mx-auto mt-5"
        style={{ width: "50%" }}
        data-aos="zoom-in-up"
      >
        <div className="d-flex justify-content-between px-5 py-4 lx">
          <div>
            <h4>Blocks {state.length}</h4>
          </div>
          <div className="d-flex">
            <input
              type="text"
              className="form-control rounded text-center me-3"
              placeholder="Search"
              style={{ width: "120px" }}
              onChange={handleSearchInputChange}
            />
            <button
              className="btn"
              style={{ width: "83px", backgroundColor: 'rgb(12, 32, 33)' }}
              onClick={handleShow}
            >
              <img src={icons} alt="" height={20} width={30} className="" /><sup> <AddIcon className='text-white' /></sup>
            </button>

            {/*--------------------------------------- Model Starts Here ------------------------------------------- */}

            <Modal show={show} onHide={handleClose} className="w-100" >
              <Modal.Header closeButton>
                <Modal.Title>Blocks Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={blockobj}
                  validationSchema={BlockApiValidation}
                  onSubmit={(values, actions) => {
                    console.log("Form Values:", values);
                    actions.resetForm();
                    AddPropertyBlockApi(values)
                    handleClose();
                  }}

                >
                  {({ errors, dirty, isValid }) => (
                    <Form>
                      <div className="mb-4">
                        <Field
                          type="text"
                          name="blocks_name"
                          placeholder="Blocks Name"
                          className="form-control"
                        />
                        {errors.blocks_name && <span className='text-danger ms-2'>{errors.blocks_name}</span>}
                      </div>
                      <div className="mb-4">
                        <Field as='select' className='form-select' name='propertyId' placeholder="Propety ID">
                          <option value="">--PropertyId--</option>
                          {
                            getallproperty.map((x) => {
                              return <option key={x.id} value={x.propertyId}>
                                <option value="">{x.id}</option>
                              </option>
                            })
                          }
                        </Field>
                        {errors.propertyId && <span className='text-danger ms-2'>{errors.propertyId}</span>}
                      </div>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button className="btn btn-danger" type="submit" disabled={!(dirty && isValid)} onClick={AddPropertyBlockApi} >
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </Modal>
          </div>
        </div>

        {/*--------------------------------------------------- Table Start Here-------------------------------------------- */}

        <DataTable
          className="datatable px-3 py-3 text-dark"
          value={filteredData}
          paginator
          rows={5}
          rowsPerPageOptions={[3, 5, 10, 25, 50]}
          tableStyle={{ minWidth: "20rem" }}>

          <Column field="id" header="ID" style={{ width: "5%" }}></Column>
          <Column field="blocks_name" header="Block Name" style={{ width: "10%" }}></Column>
          <Column field="propertyId" header="PropertyId" style={{ width: "5%" }}></Column>
          <Column header="ACTIONS" style={{ width: "15%" }} body={(rowData) => (
            <div>
              <EditIcon className="text-primary" style={{ cursor: "pointer" }} onClick={() => UpdatePropertyBlockApi(rowData)} />
              <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: "pointer" }} onClick={() => DeletePropertyBlockApi(rowData.id)} />
              <VisibilityIcon className="ms-2" style={{ cursor: "pointer" }} onClick={() => ViewPropertyBlockApi(rowData.id)} ></VisibilityIcon>
              <Tooltip title='Units'>
                <NavLink to='/units'>
                  <ApartmentIcon className='ms-2 text-primary' style={{ cursor: 'pointer' }} />
                </NavLink>
              </Tooltip>
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
            <div className="d-flex justify-content-around  px-5 py-3  main-container mt-3">
              <div className="mb-4 mt-2">
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">Property ID</p>
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">Blocks Name</p>
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">Property Name</p>
              </div>
              <div className=''>
                <p style={{ color: '#090030' }} className="mt-1 mb-3 fs-5">{viewapidata.propertyId}</p>
                <p style={{ color: '#090030' }} className="mb-3 fs-5">{viewapidata.blocks_name}</p>
                <p style={{ color: '#090030' }} className="mb-2 fs-5" >{viewapidata.property_name}</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
export default Hoc(Blocks)