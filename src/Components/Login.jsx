import React, { useContext, useRef, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoginValidation from '../loginvalidation.json'
import axios from "axios";
import { NumberContext } from './NewContext';
import Swal from 'sweetalert2';
import heroimg from '../images/seo.gif';


    const Login = () => {
    const toast = useRef(null);
    const [obj, setobj] = useState({userNameOrEmail:'',password:''})
    const [blankobj, setblankobj] = useState({})
    const [erroMsg, seterroMsg] = useState({})
    const [showerrmsg, setshowerrmsg] = useState('')
    const [showerrmsg1, setshowerrmsg1] = useState('')
    const navigate = useNavigate()

    let use = useContext(NumberContext);
    let token = JSON.parse(localStorage.getItem("token"))
    console.log(token);

       

        const getvalue = (e) =>{
                obj[e.target.name] = e.target.value;
                blankobj[e.target.name] = '';
                setblankobj({...blankobj})
                ValidationFunction(e.target.name)
        }

        const SubmitData = async () => {
            Object.keys(obj).forEach((x) => {
                ValidationFunction(x);
            });
            if (Object.keys(erroMsg).length === 0) {
                try {
                    const response = await axios.post('http://localhost:8000/api/user/login', obj);
                    let loginres = response.data;
                    let LoginAdminMangerResponse = localStorage.setItem('LoginRes',JSON.stringify(loginres));
                    console.log(LoginAdminMangerResponse);
                    console.log(loginres);
                    console.log(response.data);
                    console.log(response.data.message);
                    
                    if (response.data.message === 'Login successful') {
                            setshowerrmsg(response.data.message)  
                            navigate('/dashboard');

                            localStorage.setItem("item", true);
                            use.setitem(true);
                            
                            let token = response.data.token; 
                            localStorage.setItem('token',JSON.stringify(token))
                            console.log(token);
                    } 
                    
                    else {
                        console.log('Login failed. Message:', response.data.message);
                        
                    }
                } catch (error) {
                console.error(error);
                //    setshowerrmsg1(error.response.data.message)
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Invalid Username or Password",
                });
            
                }
            }
            setobj({ ...blankobj });
          
    };
        const ValidationFunction = (name) =>{
        let validationobj = LoginValidation.find((x)=>x.name === name);
        let valid = validationobj?.conditions.find((x)=>eval(x.condition))
        if(valid){
            erroMsg[name]=valid.error;
        }
        else{
            delete erroMsg[name]
        }
        seterroMsg({...erroMsg})
    }
    
    return (
   <div className='bada-header'>
     <div className='container-fluid shadow-lg loginform moving-border'>
        <div className='image-loginform'>
            <img src = {heroimg} loop muted autoPlay width={400} height={350} style={{background:'transparent',objectFit:'cover'} } ></img>
        </div>
        <div className='w-50 px-3 py-3 my-2 mx-3'>
        <h1 className=' mb-3 fs-2 text-white mt-2'>Login form</h1>
        <form action="" className=''>
       <FloatingLabel controlId="floatingInput" label="Email address" className="mb-4">
            <Form.Control type="email"  className='w-100' name='userNameOrEmail' value={obj.userNameOrEmail} onChange={getvalue}/>
            <h5 className='mt-2  error_msg text-danger'>{erroMsg?.userNameOrEmail}</h5>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className='mt-5 mb-4'>
            <Form.Control type="password" name ='password' value={obj.password} onChange={getvalue} />
            <h5 className='mt-2  error_msg text-danger'>{erroMsg?.password}</h5>
            <h5 className='text-center text-danger '>{showerrmsg}</h5>
            <h5 className='text-center text-danger '>{showerrmsg1}</h5>
        </FloatingLabel>
        <div className='mt-4 text-center' >
            <button className='btn btn-warning' type='button' onClick={SubmitData}>Submit</button>
        </div>
        
         </form>
        </div>
    </div>
       
   </div>
  )
}
export default Login;