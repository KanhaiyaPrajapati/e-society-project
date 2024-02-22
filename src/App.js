import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'; 
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Users from './Components/Users';
import Properties from './Components/Properties';
import { useEffect, useState } from 'react';
import { NumberContext } from './Components/NewContext';
import { useDispatch } from 'react-redux';
import { getapi } from './Redux/action/action';

function App() {
let [item, setitem] = useState(false)
item = JSON.parse(localStorage.getItem("item"))
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getapi())
},[])

return (
    <>
      <BrowserRouter>
      <NumberContext.Provider value={{item, setitem}}>
      <Routes>
        {
          item === true ?
          <>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path ='/dashboard' element={<Dashboard/>} />
          <Route path ='/user' element={<Users/>} />
          <Route path ='/properties' element={<Properties/>} />
          <Route path='*' element={<Navigate to='/Dashboard' />} />
          
          </>:
          <>
          <Route path='/'  element = {<Navigate to = '/login'/>}/>
          <Route path='/login' element ={<Login/>} />
          <Route path='*' element={<Navigate to='/login' />} />
          
          </>
        
      }
      </Routes>
      </NumberContext.Provider>
    </BrowserRouter>
   </>
  );
}

export default App;
