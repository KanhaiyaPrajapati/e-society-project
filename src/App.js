import './App.css';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Users from './Components/Users';
import Properties from './Components/Properties';
import { useEffect, useState } from 'react';
import { NumberContext } from './Components/NewContext';
import { useDispatch, useSelector } from 'react-redux';
import { PropertgetApi, getBlockApi, getManagerallapidata, getUnitsapi, getapi } from './Redux/action/action';
import Dashboard from './Components/Dashboard';
import Blocks from './Components/Blocks';
import Units from './Components/Units';


function App() {
  let [item, setitem] = useState(false)
  item = JSON.parse(localStorage.getItem("item"))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getapi())
  }, [])

  useEffect(() => {
    dispatch(PropertgetApi())
  }, [])

  useEffect(() => {
    dispatch(getBlockApi())
  }, [])

  useEffect(() => {
    dispatch(getUnitsapi())
  }, [])


  useEffect(() => {
    dispatch(getManagerallapidata())
  }, [])

  return (
    <>
      <BrowserRouter>
        <NumberContext.Provider value={{ item, setitem }}>
          <Routes>
            {
              item === true ?
                <>
                  <Route path='/' element={<Navigate to='/dashboard' />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/user' element={<Users />}></Route>
                  <Route path='/properties' element={<Properties />} />
                  <Route path='/blocks' element={<Blocks />} />
                  <Route path='/units' element={<Units />} />
                  <Route path='*' element={<Navigate to='/Dashboard' />} />

                </> :
                <>
                  <Route path='/' element={<Navigate to='/login' />} />
                  <Route path='/login' element={<Login />} />
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
