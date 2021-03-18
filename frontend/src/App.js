import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import {Route, Switch} from 'react-router-dom'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from './Components/NavBar/Navbar'
import RegisterUser from './Components/RegisterUser/RegisterUser'
import LoginUser from './Components/LoginUser/LoginUser'
//import ProfileUser from './Components/Profile/ProfileUser'
import Home from './Components/Home/Home'
//import Admin from './Components/Admin/Admin'

import{getProfile} from './JS/actions/userActions'
import PrivateRoute from './Components/PrivateRoute'
import Profile from './Components/Profiles/Profile'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    
  }, []);

  const user= useSelector((state) => state.userReducer.user);
  console.log(user)
  return (

    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' render = {()=><Home/>} />
        <Route exact path='/signup' render = {()=><RegisterUser/>} />
        <Route exact path='/login' render = {()=><LoginUser/>} />
        <PrivateRoute path="/profile" component= {Profile} /> 
        {/* <PrivateRoute path={`/profile/:${user.userName}`} component= {Profile} />  */}

        {/* <PrivateRoute path="/profile" component={ProfileUser} />  */}
        {/* <PrivateRoute path={`/profile/:${user._id}`} component={ProfileUser} /> */}
        {/* <Route exact  path="/dashboardAdmin" render = {()=><Admin/> }/> */}
       
               
        </Switch>
    </div>
  );
}

export default App;
