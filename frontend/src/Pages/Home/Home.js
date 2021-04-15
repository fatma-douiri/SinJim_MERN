import React ,{ useEffect }from 'react'
import { useDispatch} from "react-redux";
import './home.css'

import ListPolls from '../../MyComponents/ListPolls/ListPolls'
import{getAllPolls}from '../../JS/actions/pollActions'



const Home = () => {
    
//     const dispatch=useDispatch()

// useEffect (() => {
// dispatch(getAllPolls())

//    }, []);

    
    return (
        <div className="home">
            
            <h1 style={{ marginTop:"100px"}}> Home </h1>
            
            <ListPolls/>
         
        </div>
   
   
       
    )
}

export default Home
