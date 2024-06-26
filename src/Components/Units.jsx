import React, { useEffect, useState } from 'react';
import { Hoc } from './Hoc';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from "yup";
import Swal from 'sweetalert2';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from 'react-redux';
import { AddUnitsApiData, DeleteUnitsApiData, ViewUnitsApiData } from '../Redux/action/action';
import icons from '../images/Property.png';
import AddIcon from '@mui/icons-material/Add';

function Units() {
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [singleunit, setSingleunit] = useState('');
  const [getpropertyid, setGetpropertyid] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const auth = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } };
  const state = useSelector((state) => state.Unitsapi);

  const filteredData = state.filter((user) =>
    user.units_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const AddUnitsApi = (obj) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 2500
    });
    dispatch(AddUnitsApiData(obj, auth));
  };

  const UnitApiValidation = Yup.object({
    units_name: Yup.string().min(3).required('Unit Name Is Required'),
    blockId: Yup.string().required('Block Id is Required'),
    from: Yup.string().required('From is Required'),
    to: Yup.string().required('To is Required')
  });

  const deleteunitapi = (id) => {
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
        dispatch(DeleteUnitsApiData(id))
      }
    });
  };

  const Viewunitsapi = (id) => {
    dispatch(ViewUnitsApiData(id, setLgShow, setSingleunit));
  };

  useEffect(() => {
    const getpropertyid = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/property/available/property', auth);
        setGetpropertyid(res.data.inactiveProperties);
      } catch (error) {
        console.log(error.res);
      }
    };
    getpropertyid();
  }, []);

  const handleSwitchToggle = () => {
    setShowNewForm(!showNewForm); // Toggle the visibility of the new form
  };
  return (
    <>
      <div className="shadow-lg mx-auto mt-5" style={{ width: "50%" }} data-aos="zoom-in-up">
        <div className="d-flex justify-content-between px-5 py-4 lx">
          <div>
            <h4>Units {state.length}</h4>
          </div>
          <div className="d-flex">
            <input type="text" className="form-control rounded text-center me-3" placeholder="Search" style={{ width: "120px" }} onChange={handleSearchInputChange} />
            <button className="btn" style={{ width: "83px", backgroundColor: 'rgb(12, 32, 33)' }} onClick={handleShow}>
              <img src={icons} alt="" height={20} width={30} className="" /><sup className='text-white'> <AddIcon /></sup>
            </button>
            <Modal show={show} onHide={handleClose} className="w-100" >
              <Modal.Header closeButton>
                <Modal.Title className=''>
                  <div className='switcher-main'>
                    <div>
                      Units Form
                    </div>
                    <div className='parent-toogle'>
                      <span className='ms-2'>Range</span>
                      <input type="checkbox" id='toggle' onChange={handleSwitchToggle} />
                      <label htmlFor="toggle" className='switch' ></label>
                    </div>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{ units_name: '', blockId: '', from: '', to: '' }}
                  validationSchema={UnitApiValidation}
                  onSubmit={(values, actions) => {
                    console.log("Form Values:", values);
                    actions.resetForm();
                    AddUnitsApi(values);
                    handleClose();
                  }}>
                  {({ errors, dirty, isValid }) => (
                    <Form>
                      {!showNewForm && (
                        <>
                          <div className="mb-4">
                            <Field type="text" name="units_name" placeholder="Units Name" className="form-control" />
                            {errors.units_name && <span className='text-danger ms-2'>{errors.units_name}</span>}
                          </div>
                          <Modal.Footer>
                            <Button className="btn btn-warning" onClick={handleSwitchToggle}>Unit</Button>
                            <Button variant="dark" onClick={handleClose}>Close</Button>
                          </Modal.Footer>
                        </>
                      )}
                      {showNewForm && (
                        <>
                          <div className="mb-4">
                            <Field type="text" name="from" placeholder="From" className="form-control" />
                            {errors.from && <span className='text-danger ms-2'>{errors.from}</span>}
                          </div>
                          <div className="mb-4">
                            <Field type="text" name="to" placeholder="To" className="form-control" />
                            {errors.to && <span className='text-danger ms-2'>{errors.to}</span>}
                          </div>
                          <div className="mb-4">
                            <Field type="number" name="blockId" placeholder="Block Id" className="form-control" />
                            {errors.blockId && <span className='text-danger ms-2'>{errors.blockId}</span>}
                          </div>
                          <Modal.Footer>
                            <Button variant="warning" onClick={handleClose}>Close</Button>
                            <Button className="btn btn-secondary" type="submit" disabled={!(dirty && isValid)}>Submit</Button>
                          </Modal.Footer>
                        </>
                      )}
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </Modal>
          </div>
        </div>

        <DataTable className="datatable px-3 py-3 text-dark" value={filteredData} paginator rows={5} rowsPerPageOptions={[3, 5, 10, 25, 50]} tableStyle={{ minWidth: "20rem" }}>
          <Column field="id" header="ID" style={{ width: "10%" }}></Column>
          <Column field="blocks_name" header="Blocks Name" style={{ width: "20%" }}></Column>
          <Column field="units_name" header="Units Name" style={{ width: "15%" }}></Column>
          <Column field="id" header="Block ID" style={{ width: "10%" }}></Column>
          <Column header="ACTIONS" style={{ width: "20%" }} body={(rowData) => (
            <div>
              <DeleteForeverIcon className="text-danger ms-2" style={{ cursor: "pointer" }} onClick={() => deleteunitapi(rowData.id)} />
              <VisibilityIcon className="ms-2" style={{ cursor: "pointer" }} onClick={() => Viewunitsapi(rowData.id)}></VisibilityIcon>
            </div>
          )}>
          </Column>
        </DataTable>

        <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-around  px-5 py-3  main-container mt-3">
              <div className="mb-4 mt-2">
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">ID</p>
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">Blocks Name</p>
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">Units Name</p>
                <p style={{ color: '#f30a49' }} className="mb-3 fs-5">Block ID</p>
              </div>
              <div className='mt-3 fs-5'>
                <p>{singleunit?.id}</p>
                <p style={{ color: '#090030' }} className="mb-2 fs-5">{singleunit?.blocks_name}</p>
                <p style={{ color: '#090030' }} className="mt-1 mb-3 fs-5">{singleunit?.units_name}</p>
                <p style={{ color: '#090030' }} className="mb-3 fs-5">{singleunit?.blockId}</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
export default Hoc(Units);
