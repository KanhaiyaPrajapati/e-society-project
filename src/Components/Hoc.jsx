import React, { useContext } from 'react'
import DiamondIcon from '@mui/icons-material/Diamond';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SearchIcon from '@mui/icons-material/Search';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import userimg from '../images/icon-2.webp'
import { NavLink } from "react-router-dom";
import { NumberContext } from './NewContext';
import LogoutIcon from '@mui/icons-material/Logout';

export const Hoc = (Component) => {
    const NewComponent = () =>{

    let use = useContext(NumberContext);
    console.log(use);

      let logout = () =>{
      use.item = localStorage.removeItem("item");
      use.setitem(use.item);
            
    }
  return <div className="d-flex"> 
          <div className="sidebar">
            <div className="text-center py-3">
            <DiamondIcon className="text-white" style={{fontSize:'70px'}} />
            </div>
              <div className="sidebar-menu mt-5 m-3">   
                    <NavLink to='/dashboard'><div><DashboardIcon/>Dashboard</div></NavLink>
                    <NavLink to='/user'><div className="mt-3"><PeopleIcon/> Users</div></NavLink>
                    <NavLink to='/properties'><div className="mt-3"><LocationCityIcon/> Properties</div></NavLink>
              </div>
              <div className='text-center'>
                {/* <button className='btn btn-danger' onClick={logout}>Logout</button> */}
                <LogoutIcon className='text-white' style={{fontSize:'30px',marginTop:'455px',cursor:'pointer',marginRight:'10px'}} onClick={logout} />

              </div>
          </div>
          <div className="header">
              <div className=" d-flex justify-content-between">
                <div className='px-5 py-3 fs-3'>Admin Panel</div>        
              <div>
                <div className="d-flex px-2 py-3  gap-3 me-5">
                  <h2 className=""><SearchIcon/></h2>
                  <h2><AddAlertIcon/></h2>
                  <img src ={userimg} alt=""  width={30} height={30} className="mt-2" />
                  <select name="" id="" style={{textDecoration:'none'}} className="form-select ">
                    <option value="admin" className='px-2 py-2'>Admin</option>
                    <option value="" className='px-2 py-2'>Admin</option>
                  </select>
                </div>
              </div>
          </div>
          
          <div>
          </div>
              <Component/>
            </div>
        </div>

        }
  return NewComponent
}

