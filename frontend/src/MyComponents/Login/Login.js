
import React, { useState,useEffect  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'


 import { useDispatch,useSelector  } from "react-redux";
 import { Redirect ,Link} from "react-router-dom";

 import {userLogin,getProfile} from '../../JS/actions/userActions'




const Login = (user) => {
  
const [loginCred , setLoginCred] =useState({
    email:"",
    password:""
})

  
const handleChange = (e) => {
    setLoginCred({ ...loginCred, [e.target.name]: e.target.value });
  };

   const isAuth  = useSelector((state) => state.userReducers.isAuth);
   const loading = useSelector((state) => state.userReducers.loading);
            console.log('USER LOGIN:isAuth',isAuth)
            
           
   
    const dispatch=useDispatch()

   function login () {
      dispatch(userLogin(loginCred));
   }
   
   // useEffect (() => {
   //    dispatch(getProfile())
   // }, [user]);
  
   

return   isAuth ? <Redirect to='/Home'/> : loading ? ( <h1 style={{marginTop:'200px',marginLeft:'400px'}}> Please wait ...</h1> ) 
    : (   

<div className="login" style={{marginLeft:"20%"}}>
 
 
 <div className="header">LOGIN</div>
 
 
             <div className="content">
               
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
               <button className="button-log" onClick= {login } > Login </button>

               <Link to ="/Signup"> Regiter </Link>
                 </div>
             
         
 
 
 </div>

    )
}

export default Login 



