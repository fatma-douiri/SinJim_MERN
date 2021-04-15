import React, {useEffect, useState} from 'react'
import{useSelector,useDispatch}from 'react-redux'
import CreatePoll from '../../MyComponents/CreatePoll/CreatePoll'
import {getAllPolls} from '../../JS/actions/pollActions'
import ListPolls from '../../MyComponents/ListPolls/ListPolls'
import ListUsers from '../../MyComponents/ListUsers/ListUsers'
import './dashboard.css'


const Dashboard = () => {

    const allPolls  = useSelector((state) => state.pollReducers.allPolls);
    console.log("DASH : ALL POLLS:",allPolls)
    const [show , setShow]=useState(false)
    


    return (
        <div className="dash">  
            <CreatePoll/>       
            <button className="button-show" style={{marginTop:"10px"}} type="button" onClick={()=>setShow(!show)} > {show ?"ALL POLLS" :"ALL USERS"}</button>
            { show ===true ? <ListUsers /> : <ListPolls/>}
            
            
        </div>

    )       
}

export default Dashboard
