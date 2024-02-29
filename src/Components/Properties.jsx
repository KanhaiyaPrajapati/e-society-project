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
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { AddPropertApiData } from "../Redux/action/action";


function Properties() {
  const [searchInput, setsearchInput] = useState("");
  const [show, setShow] = useState(false);

  // const [selectedCountry, setSelectedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");


  let state = useSelector((state) => state.propertyapi);
  console.log(state);

  let dispatch = useDispatch()
 

  let token = JSON.parse(localStorage.getItem("token"));

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
      duration:1000
    });
    },[])

  const Propertyvalidation = Yup.object({
    property_name: Yup.string().min(5).required('Please Select Property Name'),
    property_description: Yup.string().min(5).required('Please Select Prop Desc'),
    country: Yup.string().required('Please Select Country'),
    street: Yup.string().required('Please Select Street'),
    zipcode: Yup.string().min(6).required('Please Select Zip Code'),
    state: Yup.string().required('Please Select State')
  })

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

 const SubmitData = () =>{
  
  handleClose()
 }

  return (
    <>
      <div
        className="shadow-lg mx-auto mt-5"
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
              className="btn btn-danger"
              style={{ width: "80px" }}
              onClick={handleShow}
            >
              <PersonAddAltIcon />
            </button>

            {/*--------------------------------------- Model Starts Here ------------------------------------------- */}

            <Modal show={show} onHide={handleClose} className="w-100" >
              <Modal.Header closeButton>
                <Modal.Title>Property Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    property_name: "",
                    property_description: "",
                    country: "",
                    street: "",
                    zipcode: "",
                    state: "",
                  }}
                  validationSchema={Propertyvalidation}
                  onSubmit={(values, actions) => {
                    console.log("Form Values:", values);
                    actions.resetForm();
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
          tableStyle={{ minWidth: "20rem" }}
        >
          <Column field="id" header="ID" style={{ width: "10%" }}></Column>
          <Column field="property_name" header="Property Name" style={{ width: "15%" }}></Column>
          <Column field="property_description" header="Property Description" style={{ width: "20%" }}></Column>
          <Column field="street" header="Street" style={{ width: "10%" }}></Column>
          <Column field="state" header="State" style={{ width: "10%" }}></Column>
          <Column field="country" header="Country" style={{ width: "10%" }}></Column>
          <Column field="zipcode" header="Zipcode" style={{ width: "10%" }}></Column>
          <Column header="ACTIONS" style={{ width: "25%" }} body={(rowData) => (
              <div>
                <EditIcon className="text-primary" style={{ cursor: "pointer" }}/>
                <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: "pointer" }}/>
                <VisibilityIcon className="ms-2" style={{ cursor: "pointer" }}></VisibilityIcon>
              </div>
            )}>
          </Column>
        </DataTable>
      </div>
    </>
  );
}
export default Hoc(Properties);
