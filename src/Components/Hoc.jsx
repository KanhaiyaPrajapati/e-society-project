import React, { useContext, useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import userimg from '../images/icon-2.webp'
import { NavLink } from "react-router-dom";
import { NumberContext } from './NewContext';
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboardiconpng from '../images/dashboard4.png';
import users from '../images/users.png';
import Property from '../images/Property.png';
import Home from '../images/homeLogo6.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const Hoc = (Component) => {
  const NewComponent = () => {


    const toast = useRef(null);
    const [lgShow, setLgShow] = useState(false);


    let GetLoginAdminMangerResponse = JSON.parse(localStorage.getItem('LoginRes'));
    console.log(GetLoginAdminMangerResponse.userRole);

    let use = useContext(NumberContext);
    console.log(use);

    let logout = () => {
      use.item = localStorage.removeItem("item");
      use.setitem(use.item);
    }

    return <div className="d-flex">
      <div className="sidebar">
        <div className="text-center py-3">
          {/* <DiamondIcon className="text-white" style={{ fontSize: '70px' }} /> */}
          <img src={Home} alt="" height={60} width={80} />
        </div>
        <div className="sidebar-menu mt-5 m-3">
          <NavLink to='/dashboard'><div><img src={Dashboardiconpng} height={20} width={22} className='img-fluid' /><span className='ms-2 mt-2'>Dashboard</span> </div></NavLink>
          <NavLink to='/user'><div className="mt-3"><img src={users} height={20} width={25} className='img-fluid' /><span className=' '> Users</span></div></NavLink>
          <NavLink to='/properties'><div className="mt-3"><img src={Property} height={23} width={25} className='img-fluid' /><span className='px-2 py-2 fs-4 '>Properties</span></div></NavLink>
        </div>
        <div className='text-center'>
          <LogoutIcon className='text-white' style={{ fontSize: '30px', marginTop: '455px', cursor: 'pointer', marginRight: '10px' }} onClick={logout} />
        </div>
      </div>
      <div className="header">
        <div className=" d-flex justify-content-between">
          <div className='px-5 py-3 fs-3'>{GetLoginAdminMangerResponse.userRole} Panel</div>
          <div>
            <div className="d-flex px-2 py-3  gap-3 me-5">
              <h2 className=""><SearchIcon style={{cursor:'pointer'}}  onClick={() => setLgShow(true)} />
                <Modal
                  size="lg"
                  show={lgShow}
                  onHide={() => setLgShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg">
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Search Bar
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form action="">
                      <input type="text" className='form-control' placeholder='Serach...' />
                    </form>
                  </Modal.Body>
                </Modal>
              </h2>
              <h2><AddAlertIcon /></h2>
              <img src={userimg} alt="" width={30} height={30} className="mt-2" />
            <select name="" id="" style={{ textDecoration: 'none' }} className="form-select getswitched">
                <option value="userRole" className='px-2 py-2'>{GetLoginAdminMangerResponse.userRole}</option>
              </select>
            </div>
          </div>
        </div>
        <div>
        </div>
        <Component />
      </div>
    </div>
  }
  return NewComponent
}
