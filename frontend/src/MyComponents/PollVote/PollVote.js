import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import{Link,Redirect} from 'react-router-dom'
import Modal from "react-modal";
import {votePoll,getPoll} from '../../JS/actions/pollActions'
import Login from '../Login/Login'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PollVote = ({el , votes, setVotes,totalVotes, setTotalVotes, checkVote, setCheckVote,isAuth}) => {
 
  const dispatch=useDispatch()
    


 // const isAuth = useSelector((state) => state.userlReducers.isAuth); 
  const errors = useSelector((state) => state.pollReducers.errors);
  const loading = useSelector((state) => state.pollReducers.loading);
  const votedPoll = useSelector((state) => state.pollReducers.votedPoll);
  const [myAnswer, setMyAnswer]= useState('..')
  const [refAnswer, setRefAnswer]= useState(0)
  const [message, setMessage]= useState("")
 


//   useEffect((errors)=>{
    
//     if( !errors){
//       setTotalVotes(totalVotes+1);
//       setVotes( votes.map((vote,i)=>vote ===votes[refAnswer] ? vote=vote+1: vote));
//       closeModal();
//       console.log("successs")
//     }else if (errors && !loading) {
//       return setMessage(errors.msg)
      
  
  
      
// }
//     },[votedPoll,loading,errors,votePoll])
    
    
    
     
     
    const answers = 
    el.options.map((option,i) => (
                      
      <div >  
                 <ul >
                   
          <li key={i} style={{listStyleType:"none"}} className ="button"> 
            <input 
                  type="radio" name="myAnswer" id={`${option._id}`}                     
                     
                    onChange={(e) =>{
                      e.target.value === "on"? setMyAnswer(`${option.option}`) : setMyAnswer("");
                      e.target.value==="on"? setRefAnswer(i) :setRefAnswer("")}}  /> 

            <label style={{marginLeft:"5px"}}>{option.option}</label>

          
          </li>
          
          </ul>
            
     </div>
  ))
  ;  

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

function closeModal() {
    setIsOpen(false);
  }
const vote=()=>{
  dispatch(votePoll(el._id, { answer: myAnswer }));
 setTotalVotes(totalVotes+1);
  setVotes( votes.map((vote)=>vote ===votes[refAnswer] ? vote=vote+1: vote));
  setCheckVote(true)
   closeModal();
}
    

  return isAuth === true ? (
    <div >
       <button  className="actionModal" type="button" onClick={()=>  checkVote=== true ? null : openModal()} > { checkVote ===true ?  "Voted " : "Vote Now!"} </button> 

                 <Modal 
        className="add-modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        
      <h3>{el.question}</h3>
      <div >{ answers }
       </div>
       <div className="footerPoll"> 
        <button className="actionModal" onClick={()=>{closeModal();}}>
               Close
                </button>
       <button className="submit"  onClick={()=>{vote() }}> 
          Confirm Your Vote </button>
   
       </div> 
       <span>{message}</span>
       </Modal>
    </div> )
  :  ( <div >
  <button  className="actionModal" type="button" onClick={ openModal} >  Vote Now! </button> 

            <Modal 
   className="add-modal"
   isOpen={modalIsOpen}
   onRequestClose={closeModal}
 >
   
 <Login/>
  <div className="footerPoll"> 
   <button className="actionModal" onClick={()=>{closeModal();}}>
          Close
           </button>
  
  </div> 
 
  </Modal>
</div>)

};

export default PollVote
