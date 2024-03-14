import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Hoc } from "./Hoc";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { AddPropertyApiData, DeletePropertApi, EditPropertyApidata, ViewPropertApiData } from "../Redux/action/action";
import ApartmentIcon from '@mui/icons-material/Apartment';
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import icons from '../images/Property.png'
import AddIcon from '@mui/icons-material/Add';

function Properties() {
  const [searchInput, setsearchInput] = useState("");
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [propertviewApi, setpropertviewApi] = useState(null);
  const [fillobj, setfillobj] = useState({
    property_name:'',
    property_description:'',
    street:'',
    state:'',
    country:'',
    zipcode:''
})

  let view = JSON.parse(localStorage.getItem('propertydata'));
  console.log(view);

  let state = useSelector((state) => state.propertyapi);
  console.log(state);

  let dispatch = useDispatch()

  let token = JSON.parse(localStorage.getItem("token"));

  let auth = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const filteredData = state.filter((user) =>
    user.property_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setsearchInput(e.target.value);
  };

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, [])

  const Propertyvalidation = Yup.object({
    property_name: Yup.string().min(5).required('Please Select Property Name'),
    property_description: Yup.string().min(5).required('Please Select Prop Desc'),
    country: Yup.string().required('Please Select Country'),
    street: Yup.string().required('Please Select Street'),
    zipcode: Yup.string().min(6).required('Please Select Zip Code'),
    state: Yup.string().required('Please Select State')
  })

  const SubmitData = (obj) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 2500
    });
    if(obj.id === undefined){
      dispatch(AddPropertyApiData(obj, auth))
    }
    else{
      dispatch(EditPropertyApidata(obj,auth))
    }
    handleClose()
  }

  const deleteapi = (id) => {
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
        dispatch(DeletePropertApi(id, auth))
      }
    });
  }

  const ViewPropertyapi = (id) => {
    console.log(id);
    dispatch(ViewPropertApiData(id, setpropertviewApi, setLgShow, auth))
  }

  const EditPropertyapi = (obj) => {
    setfillobj(obj)
    handleShow()
  }
  return (
    <>
      <div
        className="shadow-lg mx-auto mt-5 border border-warning"
        style={{ width: "90%" }}
        data-aos="zoom-in-up"
      >
        <div className="d-flex justify-content-between px-5 py-4 lx">
          <div>
            <h4>Properties {state.length}</h4>
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
              style={{ width: "83px", backgroundColor:'rgb(12, 32, 33)'}}
              onClick={handleShow}
            >
            <img src={icons} alt=""height={20} width={30} className="" /><sup className="text-white"> <AddIcon/></sup>
              </button>

            {/*--------------------------------------- Model Starts Here ------------------------------------------- */}

            <Modal show={show} onHide={handleClose} className="w-100" >
              <Modal.Header closeButton>
                <Modal.Title>Property Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={fillobj}
                  validationSchema={Propertyvalidation}
                  onSubmit={(values, actions) => {
                    console.log("Form Values:", values);
                    actions.resetForm();
                    SubmitData(values)
                    handleClose();
                  }}

                >
                  {({ errors, dirty, isValid }) => (
                    <Form>
                      <div className="mb-4">
                        <Field
                          type="text"
                          name="property_name"
                          placeholder="Property Name"
                          className="form-control"
                        />
                        {errors.property_name && <span className='text-danger ms-2'>{errors.property_name}</span>}
                      </div>
                      <div className="mb-4">
                        <Field
                          type="text"
                          placeholder="Property Desc"
                          name="property_description"
                          className="form-control"
                        />
                        {errors.property_description && <span className='text-danger ms-2'>{errors.property_description}</span>}
                      </div>
                      <div className="mb-4">
                        <Field
                          type="text"
                          placeholder="Street"
                          name="street"
                          className="form-control"
                        />
                        {errors.street && <span className='text-danger ms-2'>{errors.street}</span>}
                      </div>
                      <div className="mb-4 ">
                        <Field
                          type="text"
                          className="form-control"
                          name="state"
                          placeholder="State"
                        >
                        </Field>
                        {errors.state && <span className='text-danger ms-2'>{errors.state}</span>}
                      </div>
                      <div className="mb-4">
                        <Field
                          type="text"
                          className="form-control"
                          name="country"
                          placeholder="Country"
                        >
                        </Field>
                        {errors.country && <span className='text-danger ms-2'>{errors.country}</span>}
                      </div>

                      <div className="mb-4">
                        <Field
                          type="number"
                          placeholder="Zip Code"
                          name="zipcode"
                          className="form-control"
                        />
                        {errors.zipcode && <span className='text-danger ms-2'>{errors.zipcode}</span>}
                      </div>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button className="btn btn-danger" type="submit" onClick={SubmitData} disabled={!(dirty && isValid)} >
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
          <Column field="property_name" header="Property Name" style={{ width: "15%" }}></Column>
          <Column field="property_description" header="Property Des" style={{ width: "20%" }}></Column>
          <Column field="street" header="Street" style={{ width: "10%" }}></Column>
          <Column field="state" header="State" style={{ width: "10%" }}></Column>
          <Column field="country" header="Country" style={{ width: "10%" }}></Column>
          <Column field="zipcode" header="Zipcode" style={{ width: "10%" }}></Column>
          <Column header="ACTIONS" style={{ width: "25%" }} body={(rowData) => (
            <div>
              <EditIcon className="text-primary" style={{ cursor: "pointer" }} onClick={() => EditPropertyapi(rowData)} />
              <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: "pointer" }} onClick={() => deleteapi(rowData.id)} />
              <VisibilityIcon className="ms-2" style={{ cursor: "pointer" }} onClick={() => ViewPropertyapi(rowData.id)} ></VisibilityIcon>
              <Tooltip TransitionComponent={Zoom} title="Blocks">
                <NavLink to='/blocks'><ApartmentIcon className="apartment-icon ms-2 text-primary" style={{ cursor: "pointer" }} /></NavLink>
              </Tooltip>
            </div>
          )}>
          </Column>
        </DataTable>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              View Property Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="d-flex justify-content-around  px-5 py-3  main-container mt-3 ">
              <div className="mb-4">
                <h5 style={{ color: '#f30a49' }} className="mb-3">Property ID </h5>
                <h5 style={{ color: '#f30a49' }} className="mb-3">Property Name </h5>
                <h5 style={{ color: '#f30a49' }} className="mb-3">Property Des </h5>
              </div>
              <div className="">
                <h5 style={{ color: '#090030' }} className="mb-3">{view?.id}</h5>
                <h5 style={{ color: '#090030' }} className="mb-3">{view?.property_name}</h5>
                <h5 style={{ color: '#090030' }} className="mb-3">{view?.property_description}</h5>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
export default Hoc(Properties);


// const handleCountryChange = (e,formikProps) => {
//   const selectedValue = e.target.value;

//  formikProps.setFieldValue('country', selectedValue);
//  formikProps.setFieldValue('state', '');
// };

// const handleStateChange = (e, formikProps) => {
//   const selectedValue = e.target.value;
//   formikProps.setFieldValue('state', selectedValue);
// };

// const getStatesByCountry = () => {
//   switch (selectedCountry) {
//     case "India":
//       return ["Gujarat", "Maharashtra", "Delhi"];
//     case "United States":
//       return ["California", "New York", "Texas"];
//     case "England":
//       return ["London", "Manchester", "Liverpool"];
//     default:
//       return [];
//   }
// };

// const countryMap = {
//   "1": "India",
//   "2": "United States",
//   "3": "England",
// };


// const initialValues = {
//   property_name: "",
//   property_description: "",
//   country: "",
//   street: "",
//   zipcode: "",
//   state: "",
// };

// const handlesubmit = (values, actions) => {
//   console.log("Values:", values);
//   console.log("Actions:", actions);
//   actions.resetForm();
// };

//   const getvalue = (e, fieldName,formikProps ) => {
//   const selectedValue = formikProps.values[fieldName];
//   const displayedValue = countryMap[selectedValue] || selectedValue;
//   console.log(` ${fieldName} : ${displayedValue}`);
// };
