import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getAllUsers,banUser} from '../../JS/actions/userActions'
import User from '../User/User'

const ListUsers = () => {

    const allUsers  = useSelector((state) => state.userReducers.allUsers);
    const isAuth  = useSelector((state) => state.userReducers.isAuth)
    

    const dispatch=useDispatch()
    useEffect (() => {
    dispatch(getAllUsers())
    
       }, []);

    const [idBan,setIdBan]=useState("")

    



    return (
        <div> 

        
        <input name="idBan" type="text" placeholder="Id User" onChange={(e)=>setIdBan(e.target.value)}/>

        <button onClick= {()=>dispatch(banUser(idBan))}> Ban User </button>  

             <div>
             {allUsers.map((user, i) => (
             <div >                  
             
              <User id={user._id} user={user} key={i} /> 
            </div>
           )
           )}</div>
        </div>
    )
}

export default ListUsers
