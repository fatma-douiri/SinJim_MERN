
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './registerUser.css'

import { useDispatch  , useSelector} from "react-redux";
import { userRegister } from '../../JS/actions/userActions';
import { Redirect } from "react-router-dom";



const RegisterUser = () => {

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role] = useState(1);
 

  const dispatch=useDispatch()

 // const errors = useSelector((state) => state.userReducer.errors);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const loading = useSelector((state) => state.userReducer.loading);
  

  
  const addUser = () => {
    dispatch(
      userRegister({ userName, email, password,role,})      
    );
   

  };

        return isAuth ? (
  <Redirect to="/" />
  
  ) : loading ? ( <h1> please wait </h1> ) 
  : (  
 <div className="signup">
  

<div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <h5 className="card-title fw-400">SignUp</h5>
                <div className="card-body">
                
                  <div className="form-group"> 
                    <input className="form-control" type="text" placeholder="User Name" name="name"
                    onChange={(e) => setUserName(e.target.value)}/> 
                     </div>               

                  <div className="form-group"> 
                     <input className="form-control" type="email" placeholder="Email" name="email"
                     onChange={(e) => setEmail(e.target.value)}/> 
                     </div>
                  
                  <div className="form-group"> 
                     <input className="form-control" type="password" placeholder="Password" 
                     onChange={(e) => setPassword(e.target.value)}/> 
                     </div>

                   <button className="btn btn-block btn-bold btn-primary" onClick={addUser}>SignUp</button>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    </div>
    )
}

export default RegisterUser
