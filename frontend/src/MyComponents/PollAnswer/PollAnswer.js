import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {votePoll} from '../../JS/actions/pollActions'
import { Doughnut } from 'react-chartjs-2';
import { color } from './color'
import { Redirect } from "react-router-dom";
import './pollAnswer.css'
import {Link} from 'react-router-dom'
import PollVote from '../PollVote/PollVote'



const PollAnswer = ({el}) => {


  const user = useSelector((state) => state.userReducers.user);
  const isAuth  = useSelector((state) => state.userReducers.isAuth)
  
    
    
  // const [voted,setVoted]=useState(el.usersWhoVoted.map(userVoted=>userVoted._id).includes(`${user._id}`))
    const userVoted= el.usersWhoVoted.filter( userVoted => userVoted._id === user._id ).length; 
    console.log("userVotedlenght",userVoted) 

    const voted = (x)=> {
      if (Number(x) > 0) {return true } else {return false}
    } 
    const v= voted(userVoted);
    console.log("v", v)
    
    
    const [checkVote, setCheckVote]= useState(v)
    console.log("checkVote",checkVote)
   
   

   


    const [votes,setVotes]=useState(el.options.map( option=> Number(option.votes)))
    const [totalVotes,setTotalVotes]=useState(el.options.map(option=> option.votes).reduce((a,b)=>a+b))
  
    const answers = 
    el.options.map((option,i) => 
        
      <div 
      className ="answer"   
      style= {{ background:`${votes[i]}`== 0 ? "White" : `linear-gradient(to right,#fec400 ${votes[i]*100/totalVotes }%, White 10% ) `, opacity:'0.8' }}
          > 
         
    
           <span>  {`${option.option}   ${ votes[i] == 0 ? "0": (votes[i]*100/totalVotes).toFixed(0) } %` } </span>  
  
        </div>   
    
    )
   

  return (
    <div className="poll">
      
     
      <h3>{el.question}</h3>
     
      { answers }
      <span>{`Total votes :${totalVotes}`}  </span>
      <div className="footerPoll">      
      <Link >{`Category : ${el.category}`}
          </Link>
     
      <PollVote el={el} votes={votes} setVotes={setVotes} totalVotes={totalVotes} setTotalVotes={setTotalVotes} 
      checkVote={checkVote} setCheckVote={ setCheckVote} isAuth={isAuth} />

      
      </div>
       
    </div>
  );
};


export default PollAnswer
