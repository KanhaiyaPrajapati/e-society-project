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

 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

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
                          <input type="text" name="" id="" />
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
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Krishna</td>
              <td>Krishnaprajapati756@gmail.com</td>
              <td>8849931533</td>
              <td>Admin</td>
              <td>
                <EditIcon className="text-primary" />{" "}
                <DeleteForeverIcon className="text-danger" /> <VisibilityIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Hoc(Users);
