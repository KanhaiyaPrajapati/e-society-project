import React, { useContext, useEffect, useRef, useState } from 'react'
import AddAlertIcon from '@mui/icons-material/AddAlert';
import userimg from '../images/3duser2.png'
import { NavLink } from "react-router-dom";
import { NumberContext } from './NewContext';
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboardiconpng from '../images/dashboard4.png';
import users from '../images/users.png';
import Property from '../images/Property.png';
import Home from '../images/homeLogo6.png';
import Badge from 'react-bootstrap/Badge';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchIcon from '@mui/icons-material/Search';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Tooltip from '@mui/material/Tooltip';


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

    useEffect(() => {
      AOS.init({ duration: 3000 });
    }, []);


    return (
      <div className="d-flex justify-content-between">
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
            <Tooltip title='Logout'>
              <LogoutIcon className='text-white' style={{ fontSize: '30px', marginTop: '455px', cursor: 'pointer', marginRight: '10px' }} onClick={logout} />
            </Tooltip>
          </div>
        </div>

        <div className="header">
          <div className="d-flex justify-content-between">
            <div className='px-5 py-3 fs-3'>{GetLoginAdminMangerResponse.userRole} Panel</div>
            <div className="d-flex px-5 py-3 gap-3 me-2">
              <div className='searchbar-box' data-aos="zoom-in-up">
                <SearchIcon className='search-icon' />
                <input type="text" className='search-input px-3 py-2' placeholder=' Search...' />
              </div>
              <Tooltip title='Notification' style={{cursor:'pointer'}}>
              <div className='badge-parent'>
                <h2><AddAlertIcon/></h2>
                <Badge bg="danger" className='badge'>1</Badge>
              </div>
              </Tooltip>
              <div className='dots-parent me-2 ms-2'>
               <Tooltip title='User' style={{cursor:'pointer'}}>
                  <img src={userimg} alt="" width={38} height={38} className="mt-1 rounded-pill border border-dark" />
              </Tooltip>
                <FiberManualRecordIcon className='dots'  />
              </div>
                
              <select style={{ textDecoration: 'none' }} className="getswitched px-3 border border-outline-dark rounded">
                <option value="userRole" className=''>{GetLoginAdminMangerResponse.userRole}</option>
              </select>
            </div>
          </div>
          <div>
          </div>
          <Component />
        </div>
      </div>
    )
  }
  return NewComponent
}
