import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {votePoll} from '../../JS/actions/pollActions'
import Poll from "react-polls";
import {FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Button} from '@material-ui/core'

const MyPoll = ({el}) => {

    const user    = useSelector((state) => state.userReducers.user);

    const [options, setOptions] = useState([...el.options])

    const [option, setOption] = useState(options.map( option=> option.option))
    const [votes,setVotes]=useState(options.map( option=> option.votes))
    const [totalVotes,setTotalVotes]=useState(votes.reduce((a,b)=>a+b))
    
     const userVoted= el.usersWhoVoted.filter( userVoted => userVoted._id === user._id ).length;    
     const checkVoted = (Number(userVoted) > 0) ? true : false ;
     const [voted, setVoted]= useState(checkVoted)
     console.log("VOTED CHAKED",voted)

   // const[voted, setVoted]=useState(false)
    
  

 ;
const dispatch=useDispatch()
const [answer,setAnswer]=useState('')

const handleAnswer=(e,i)=>{
 
  
}
   
  const handleVote = (e) => {
    setOptions((options) =>
      options.map((option) =>
        option.option === e.taget.value
          ? {
              ...option,
              votes: option.votes + 1,
            }
          : option
      )
      
    );
    
    
  };

  const answers = 
    
  options.map((option,i) => (
     
     <div key={i}>
            
            <label  >{option.option}</label>
            <input type='radio'   value={`${option.option}`}    onChange={(e)=>{setAnswer(e.target.value);console.log("!!!!!!!",e.target.value);}}/>
                    
    </div>
 ))
 ;



    return (
        <div>
          <h3>{el.question}</h3>
          {}
          <form>
         {answers}
        </form>
      </div>
    )
}

export default MyPoll










// import {useState,useEffect} from 'react'
// import {useSelector,useDispatch} from 'react-redux'
// import {votePoll} from '../../JS/actions/pollActions'

const VotePoll = ({match, allPolls}) => {
    

    const myPoll = allPolls.find(poll=> poll._id === (match.params.id).toString() )
    
    console.log("MyPoll: myPoll:",myPoll)
    
  const user    = useSelector((state) => state.userReducers.user);
  const votedPoll =useSelector((state) => state.userReducers.votedPoll);
  const errors = useSelector((state) => state.userReducers.errors);
  
    
   
     
     const [voted,setVoted]=useState(myPoll.usersWhoVoted.map(userVoted=>userVoted._id).includes(`${user._id}`))
     console.log("myPoll:Voted",voted)
    // const userVoted= el.usersWhoVoted.filter( userVoted => userVoted._id === user._id ).length;   
    
    // const checkVoted = (Number(userVoted) > 0) ? true : false ;
    // const [voted, setVoted]= useState(checkVoted)
    // console.log("voted",voted)

    const [myAnswer, setMyAnswer]= useState('')
    

   
    
    
    
    
    const dispatch=useDispatch()
   
     
     
    const answers = 
    myPoll.options.map((option,i) => (
     
      <div key={i}>
             
             <label  >{option.option}</label>
             <input type='radio'   value={`${option.option}`}    onChange={(e)=>{setMyAnswer(e.target.value);console.log("!!!!!!!",e.target.value);}}/>
                     
     </div>
  ))
  ;
    

    
    

  return (
    <div className="poll" style={{marginTop:"100px"}}>
     
           <span>{`Category : ${myPoll.category}`}</span>
      <h3>{myPoll.question}</h3>
      <div >{ answers }</div>
      <div > 
       </div>

       <button type="button"  onClick={dispatch(votePoll(myPoll._id, { answer: myAnswer }))}> Confirm Your Vote</button>
       
        
    </div>
  );
};

//export default VotePoll
