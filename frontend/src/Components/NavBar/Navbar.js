import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user= useSelector((state) => state.userReducer.user);
    // const user = useSelector((state) => state.userReducer.user);
    console.log(isAuth)
    
    
    return (!isAuth ? (
        <div className="navbar">
        
        <nav className="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
    <div className="container-fluid"><Link to ="/" className="navbar-brand" >SinJim</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav text-right text-white ml-auto">
                <li className="nav-item" role="presentation"><Link to ="/" className="nav-link active" >Home</Link></li>
                <li className="nav-item" role="presentation"><Link className="nav-link" >Polls</Link></li>   
                <div className="login">             
                <li className="nav-item" role="presentation"><Link to="/signup" className="nav-link" >SingUp</Link></li>
                <li className="nav-item" role="presentation"><Link to="/Login" className="nav-link" >Login</Link></li>
                </div> 
            </ul>
            
            </div>
          </div>
         </nav>       
        </div>)
        :(
             <div className="navbar">
        
             <nav className="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
         <div className="container-fluid"><Link to ="/" className="navbar-brand" >SinJim</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
             <div className="collapse navbar-collapse" id="navcol-1">
                 <ul className="nav navbar-nav text-right text-white ml-auto">                     
                     <li className="nav-item" role="presentation"><Link to ="/" className="nav-link active" >Home</Link></li>
                     <li className="nav-item" role="presentation"><Link className="nav-link" >Polls</Link></li>              
                     <div className="login" >
                   <li className="nav-item" role="presentation"><Link to={`/profile/:${user.userName}`} className="nav-link" >{user.userName}</Link></li>
                   </div>
                 </ul>
                 
                 </div>
               </div>
              </nav>       
             </div>
        )
    )
}

export default Navbar
