import React  ,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './navBar.css';

import { useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom'

import {getProfile} from '../../JS/actions/userActions'


const Navbar = ({user,isAuth}) => {

    // const isAuth  = useSelector((state) => state.userReducers.isAuth);
    // const user    = useSelector((state) => state.userReducers.user);

    console.log("NAV BAR : user:",user)
    
    const dispatch = useDispatch();

  //   useEffect(() => {
    
  //   dispatch(getProfile());
    
    
  // }, [user]);
    const logout =()=>{
        localStorage.removeItem('token');}
    
        
    return (
        
        
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark"> 
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item active nav-link">
                             
                              SinJim </li>

                            <li className="nav-item">        
                             <Link to="/Home" className="nav-link"> 
                               Home </Link> </li>

                            
                            { isAuth===true ?
                             <li className="nav-item"> 
                              <Link  onClick= {logout}  className="nav-link"> 
                                Logout</Link> </li> 
                              :
                              <li className="nav-item"> 
                              <Link  to='/Login' className="nav-link"> 
                                Login </Link> </li> 
                            }
                             
                             
                            { isAuth===true ?
                             <li className="nav-item">       
                             <Link  to= {user.isAdmin === false ? "/MyProfile" : "/Dashboard"} className="nav-link"> 
                             { (user.isAdmin===true) ? "DASHBOARD" : user.userName }  </Link> </li>                      
                       
                              :
                              <li className="nav-item">       
                              <Link  to= { "/Signup" } className="nav-link"> 
                              Signup  </Link> </li>                      
                             }


                                                 
                       
                        </ul>
                    </div>
                </nav>       
      
    )
     
}

export default Navbar
