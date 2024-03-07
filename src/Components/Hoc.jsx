import React, { useContext } from 'react'
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


export const Hoc = (Component) => {
  const NewComponent = () => {

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
          <img src={Home} alt="" height={60} width={80}  />
        </div>
        <div className="sidebar-menu mt-5 m-3">
          <NavLink to='/dashboard'><div><img src={Dashboardiconpng}  height={20} width={25} className='img-fluid'/><span className='px-1 py-5 fs-4 ms-1 mt-2'>Dashboard</span> </div></NavLink>
          <NavLink to='/user'><div className="mt-3"><img src={users}  height={20} width={25} className='img-fluid'/><span className=' '> Users</span></div></NavLink>
          <NavLink to='/properties'><div className="mt-3"><img src={Property}  height={23} width={25} className='img-fluid'/><span className='px-2 py-2 fs-4 '>Properties</span></div></NavLink>
        </div>
        <div className='text-center'>
          <LogoutIcon className='text-white' style={{ fontSize: '30px', marginTop: '455px', cursor: 'pointer', marginRight: '10px' }} onClick={logout} />
        </div>
      </div>
      <div className="header">
        <div className=" d-flex justify-content-between">
          <div className='px-5 py-3 fs-3'>Admin Panel</div>
          <div>
            <div className="d-flex px-2 py-3  gap-3 me-5">
              <h2 className=""><SearchIcon /></h2>
              <h2><AddAlertIcon /></h2>
              <img src={userimg} alt="" width={30} height={30} className="mt-2" />
              <select name="" id="" style={{ textDecoration: 'none' }} className="form-select ">
                <option value="admin" className='px-2 py-2'>Admin</option>
                <option value="" className='px-2 py-2'>Admin</option>
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

