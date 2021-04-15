
import React, { useState,useEffect  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'



 import { useDispatch,useSelector  } from "react-redux";
 import { Redirect } from "react-router-dom";


import {addUser, userLogin} from '../../JS/actions/userActions'




const Register = () => {
  
const [newUser , setNewUser] =useState({
    userName:"",
    email:"",
    password:""
})
const [loginCred , setLoginCred] =useState({
   email:"",
   password:""
})


  
const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

   const isAuth  = useSelector((state) => state.userReducers.isAuth);
   const loading = useSelector((state) => state.userReducers.loading);
   console.log("REGISTER : isAuth :",isAuth)
   
   
   
   const dispatch=useDispatch()

   function userRegister () {
      dispatch(addUser(newUser));
      setLoginCred({email:newUser.email, password:newUser.password })
      
   }
   
   useEffect (() => {
      dispatch(userLogin(loginCred))

   }, [isAuth]);
  
   

return   isAuth ? <Redirect to='/Home'/> : loading ? ( <h1 style={{marginTop:'200px',marginLeft:'400px'}}> Please wait... </h1> ) 
    : (   

<div className="register" style={{marginLeft:"20%"}}>
 
 
 <div className="header">SIGNUP</div>
 
 
             <div className="content">
               <div className="form-group"> 
                 <input className="form-control" type="text" placeholder="User Name" name="userName"
                  onChange={handleChange}/> 
                  </div>               
 
               <div className="form-group"> 
                  <input className="form-control" type="email" placeholder="Email" name="email"
                   onChange={handleChange}/> 
                  </div>
               
               <div className="form-group"> 
                  <input className="form-control" type="password" placeholder="Password" name="password"
                  onChange={handleChange}/> 
                  </div>
                  </div>
 
                  <div className="actions">
               <button className="button-log" onClick= {userRegister } > SignUp </button>
              </div>
             
         
 
 
 </div>

    )
}

export default Register 



