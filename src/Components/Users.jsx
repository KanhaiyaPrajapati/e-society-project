import React, { useEffect, useState } from "react";
import { Hoc } from "./Hoc";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
function Users() {

  const [arr, setarr] = useState([])   
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow =  () => setShow(true);

  useEffect(() => {
    getapi();
  }, []);

  const auth = {
    headers:{
      Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA4MTUxMDY1fQ.7eQxAZiRUJr00r5nJVNkz23iPmWXqRuWHcA_ug6zmqY'
    }
  }

  const getapi = () => {
    axios.get("http://localhost:8000/api/user/",auth).then((res) => {
        console.log(res.data);
        setarr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="shadow-lg  mx-auto mt-5" style={{ width: "90%" }}>
        <div className=" d-flex justify-content-between px-1 py-3">
          <div>
            <h4 className="ms-3">Users</h4>
          </div>

          <div className="px-5 d-flex ">
            <input type="text" className="form-control rounded text-center me-3" placeholder="Search" style={{ width: "120px" }}/>
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
                          <input type="text" name="firstName" id="" placeholder="FirstName" className="form-control"/>
                      </div>
                      <div className="mt-4">
                          <input type="text" name="lastName" id="" placeholder="lastName" className="form-control"/>
                      </div>
                      <div className="mt-4">
                          <input type="email" name="email" id="" placeholder="email" className="form-control"/>
                      </div>
                      <div className="mt-4">
                        <select name ="role" id="" className="form-select" >
                          <option value = "" selected >--User Role--</option>
                          <option value="ADMIN"> ADMIN</option>
                          <option value="Manager">Manager</option>
                        </select>
                      </div>
                     
                      <div className="mt-4">
                      <select name ="propertyId" id="" className="form-select" >
                          <option value = "" selected >-Properties-</option>
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
                <Button variant="primary" onClick={handleClose}>
                  Submit
                </Button>
              </Modal.Footer>
          </Modal>
          </div>
        </div>

        <table className="table text-center px-3 py-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>PHONE</th>
              <th>ROLE</th>
              <th>propertyId</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
                  {
                    arr.map((x,i)=>{
                    return <tr key={i}>
                       <td>{x.id}</td>
                       <td>{x.firstName}</td>
                       <td>{x.lastName}</td>
                       <td>{x.email}</td>
                       <td>{x.role}</td>
                       <td>{x.propertyId}</td>
                       <td>
                           <EditIcon className="text-primary" />{" "}
                           <DeleteForeverIcon className="text-danger" /> <VisibilityIcon />
                       </td>
                    </tr>  
                    })
                  }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Hoc(Users);
