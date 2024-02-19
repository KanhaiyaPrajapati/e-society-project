import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'; 
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Users from './Components/Users';
import Properties from './Components/Properties';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'  element = {<Navigate to = '/login'/>}/>
        <Route path='/login' element ={<Login/>} />
        <Route path ='/dashboard' element={<Dashboard/>} />
        <Route path ='/user' element={<Users/>} />
        <Route path ='/properties' element={<Properties/>} />
      </Routes>
    </BrowserRouter>
      
      
    </>
  );
}

export default App;
