//import './App.css'
import {Route, Switch,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {getProfile} from './JS/actions/userActions'
import {getAllPolls} from './JS/actions/pollActions'


import Navbar from './MyComponents/NavBar/NavBar'
import Register from './MyComponents/Register/Register'
import Login from './MyComponents/Login/Login'
import Home from './Pages/Home/Home'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Pages/Profile/Profile'



import PrivateRoute from './MyComponents/PrivateRoute'



function App() {

  const isAuth  = useSelector((state) => state.userReducers.isAuth);
  const user    = useSelector((state) => state.userReducers.user);
  const allPolls  = useSelector((state) => state.pollReducers.allPolls);
  console.log("APP:allPolls:",allPolls)
  //const token    = useSelector((state) => state.userReducers.token);

   const token = localStorage.getItem('token');
  // const isToken = token ? true :false
  console.log("APP :token :", token)
  
  
  console.log("APP : user.isAdmin :", user.isAdmin)
  
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getProfile());
    

    
    
  }, [isAuth]);



   
  return  (

              <div className="App">
                <Navbar user={user} isAuth={isAuth}/>

                <Route axact path='/'      render = {() =>  <Redirect to="/Home" /> }/>
                <Switch>
                
                  <Route exact path='/Home'      render = {() =>  <Home /> }/>
                  <Route exact path='/Signup'    render = {() =>  <Register/>} />
                  <Route exact path='/Login'    render = {() =>  <Login user={user}/>} />
                  {/* <Route exact path='/Dashboard' render = {() =>  <Dashboard/>} />
                  <Route exact path='/MyProfile' render = {() =>  <Profile/>} /> */}

                 

                  <PrivateRoute path={user.isAdmin ?"/Dashboard":"/MyProfile"}   token={token}  component= { user.isAdmin ? Dashboard : Profile }/>
                </Switch>
               
              </div>
  )
         
}

export default App;
