import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getProfile} from '../../JS/actions/userActions'
import EditProfile from '../../MyComponents/EditProfile/EditProfile'
import './profile.css'

const Profile = () => {
    
    const user   = useSelector((state) => state.userReducers.user);
    const allPolls  = useSelector((state) => state.pollReducers.allPolls);
    

   
   
      


    return (
        <div className="user"  style={{marginTop:"100px"}}>
            
            <div className="page-content page-container " id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">



                    <div className="card-block text-center text-white">

                      <div className="m-b-25"> 
                      <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                      
                      <h6 className="text-muted f-w-700">{user.userName}</h6> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                      <EditProfile user={user} > Edit Profile</EditProfile>
                    </div>
                  </div>


                  
                  <div className="col-sm-8">
                    <div className="card-block">
                       <div className="row">


                        <div className="col-sm-10">
                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Email</h6>
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Polls Voted</h6>
                      <div className="row">
                        <div className="col-sm-10">
                          <p className="m-b-10 f-w-600">

                            {user.pollsVoted.map((el,i)=>
                             <div>
                             {allPolls.map((poll)=>poll._id===el._id?<div> 
                                <a href={`/polls/${poll._id}`} > {poll.question} </a> </div> :null)}
                         </div>)}
                             
                             </p>
                          
                        </div>

                      
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Profile
