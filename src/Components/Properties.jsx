import React, { useState } from "react";
import { Hoc } from "./Hoc";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AOS from "aos";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "aos/dist/aos.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";

import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import * as Yup from 'yup'
import {Formik,Form,Field} from 'formik'

function Properties() {
  const [searchInput, setsearchInput] = useState("");
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = JSON.parse(localStorage.getItem('token'))
  let state = useSelector((state) => state.propertyapi)

    const filteredData = state.filter((user) =>
    user.userName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const initialValues ={
    property_name:'',
    property_description:'',
    country:'',
    street:'',
    state:'',
    zipcode:''
  }

  const handlechnage = (values, actions) => {
    actions.resetForm()
    console.log(values);
  }

  
 


 return (
    <>
      <div className="shadow-lg mx-auto mt-5" style={{ width: "90%" }} data-aos="zoom-in-up">
        <div className="d-flex justify-content-between px-5 py-4 lx">
          <div>
            <h4>Properties</h4>
          </div>
          <div className="d-flex">
            <input
              type="text"
              className="form-control rounded text-center me-3"
              placeholder="Search"
              style={{ width: "120px" }}

            />
            <button className="btn btn-danger" style={{ width: "80px" }} onClick={handleShow}>
              <PersonAddAltIcon />
            </button>
            <Modal show={show} onHide={handleClose} dialogClassName='custom-modal-width' >
              <Modal.Header closeButton>
                <Modal.Title>Property Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              <Formik initialValues={initialValues} onSubmit={handlechnage}>
  <Form>
    <div className="mb-3">
      <Field
        type="text"
        name="property_name"
        placeholder="Property Name"
        className="form-control"
      />
    </div>
    <div className="mb-3">
      <Field
        type="text"
        name="property_description"
        placeholder="Property Desc"
        className="form-control"
      />
    </div>
    <div className="mb-3">
      <Field
        type="text"
        name="street"
        placeholder="Street"
        className="form-control"
      />
    </div>
    <div className="mb-3">
      <Field
        type="text"
        name="country"
        placeholder="Country"
        className="form-control"
      />
    </div>
    <div className="mb-3">
      <Field
        type="text"
        name="state"
        placeholder="State"
        className="form-control"
      />
    </div>
    <div className="mb-3">
      <Field
        type="number"
        name="zipcode"
        placeholder="Zip Code"
        className="form-control"
      />
    </div>
  </Form>
</Formik>



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        {/*-------------------------------------------------- Table Start Here-------------------------------------------- */}
        <DataTable className="datatable px-3 py-3 text-dark" value={filteredData} paginator rows={5} rowsPerPageOptions={[3, 5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }}>
          <Column field="id" header="ID" style={{ width: '10%' }}></Column>
          <Column field="property_name" header="Property Name" style={{ width: '13%' }}></Column>
          <Column field="property_description" header="Property Desc" style={{ width: '20%' }}></Column>
          <Column field="street" header="Street" style={{ width: '12%' }}></Column>
          <Column field="country" header="Country" style={{ width: '10%' }}></Column>
          <Column field="state" header="State" style={{ width: '10%' }}></Column>
          <Column field="zipcode" header="Zipcode" style={{ width: '10%' }}></Column>
          <Column header="ACTIONS" style={{ width: '25%' }} body={(rowData) => (
            <div>
              <EditIcon className="text-primary" style={{ cursor: 'pointer' }} />
              <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: 'pointer' }} />
              <VisibilityIcon className="ms-2" style={{ cursor: 'pointer' }} ></VisibilityIcon>
            </div>
          )}>
          </Column>
        </DataTable>



      </div>
    </>
  );
}

export default Hoc(Properties);
