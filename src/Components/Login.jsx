import React, { useContext, useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import LoginValidation from '../loginvalidation.json'
import { Navigate, json, useNavigate } from 'react-router-dom';
import axios from "axios";
import { NumberContext } from './NewContext';

function Login() {

    const [obj, setobj] = useState({userNameOrEmail:'',password:''})
    const [blankobj, setblankobj] = useState({})
    const [erroMsg, seterroMsg] = useState({})
    const [showerrmsg, setshowerrmsg] = useState('')
    const [showerrmsg1, setshowerrmsg1] = useState('')
    const navigate = useNavigate()

    let token = JSON.parse(localStorage.getItem("token"))
    console.log(token);

    const getvalue = (e) =>{
        obj[e.target.name] = e.target.value;
        blankobj[e.target.name] = '';
        // console.log(obj);
        setblankobj({...blankobj})
        ValidationFunction(e.target.name)
    }

    // const LoginApi = () =>{
    //    axios.post('http://localhost:8000/api/user/login',obj).then((res)=>{
    //     console.log(res.data);
    //     console.log(res.data.message);
    //     }).catch((err)=>{
    //         console.log(err);
    //     }) 
    // }

    let use = useContext(NumberContext);
    const SubmitData = async () => {
        Object.keys(obj).forEach((x) => {
            ValidationFunction(x);
        });
        if (Object.keys(erroMsg).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/api/user/login', obj);
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
               setshowerrmsg1(error.response.data.message)
            }
            
           
        }
        setobj({ ...blankobj });
    };
     const ValidationFunction = (name) =>{
        let validationobj = LoginValidation.find((x)=>x.name == name);
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
            <img src='https://picsum.photos/400/400' alt="" className='img-fluid' style={{objectFit:'cover',borderRadius:'2px'}} />
        </div>
        <div className='w-50 px-3 py-3 my-2 mx-3'>
        <h1 className='mt-2 mb-4 fs-2 text-white'>Login form</h1>
        <form action="" className=''>
       <FloatingLabel controlId="floatingInput" label="Email address" className="mb-4">
            <Form.Control type="email"  className='w-100' name='userNameOrEmail' value={obj.userNameOrEmail} onChange={getvalue}/>
            <h5 className='mt-2  error_msg text-danger'>{erroMsg?.userNameOrEmail}</h5>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className='mt-4'>
            <Form.Control type="password"  className='' name ='password' value={obj.password} onChange={getvalue} />
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
export default Login