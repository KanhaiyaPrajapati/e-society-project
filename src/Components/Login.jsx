import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import LoginValidation from '../loginvalidation.json'
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [obj, setobj] = useState({email:'',password:''})
    const [blankobj, setblankobj] = useState({})
    const [erroMsg, seterroMsg] = useState({})

    const getvalue = (e) =>{
        obj[e.target.name] = e.target.value;
        blankobj[e.target.name] = '';
        console.log(obj);
        setblankobj({...blankobj})
        ValidationFunction(e.target.name)
    }

    const SubmitData = () =>{
        Object.keys(obj).forEach((x)=>{
            ValidationFunction(x)
          })
         if(Object.keys(erroMsg).length>0){
            return
         } 
         else{
            navigate('/dashboard')
         }
     
       setobj({...blankobj})
      
    }
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
            <Form.Control type="email" placeholder="name@example.com" className='w-100' name='email' value={obj.email} onChange={getvalue}/>
            <h5 className='mt-2  error_msg text-danger'>{erroMsg?.email}</h5>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className='mt-4'>
            <Form.Control type="password" placeholder="Password" className='' name='password' value={obj.password} onChange={getvalue} />
            <h5 className='mt-2  error_msg text-danger'>{erroMsg?.password}</h5>
        </FloatingLabel>
        <div className='mt-5 text-center' >
            <button className='btn btn-warning' type='button' onClick={SubmitData}>Submit</button>
        </div>
        </form>
        </div>
    </div>
   </div>
  )
}

export default Login