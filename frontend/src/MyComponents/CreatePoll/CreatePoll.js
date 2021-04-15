import React,{useState} from 'react'
import {addPoll} from '../../JS/actions/pollActions'
import { useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Modal from "react-modal";
//Modal.setAppElement("#root");
import './createPoll.css'

const CreatePoll = () => {

const [newPoll , setNewPoll] =useState({
        category:"",
        question:"",
        
       
    })
    const handleChange = (e) => {
      setNewPoll ({ ...newPoll, [e.target.name]: e.target.value });
    };
    const [options, setOptions] = useState([
      {id: uuidv4(), option:''}
    ])
    
   
    const handleChangeOptions = (id, event) => {
      const newOption = options.map(option => {
        if(id === option.id) {
          option[event.target.name] = event.target.value
        }
        return option;
      })
      
      setOptions(newOption);
    }

    const addOption = () => {
      setOptions([...options, { id: uuidv4(),  option: '' }])
    }
    const deleteOption = (id) => {
      const newOptions=[...options];
      newOptions.splice(newOptions.findIndex(option => option.id === id), 1);
      setOptions(newOptions)
    }
  
    
    
     
  const dispatch=useDispatch()
  function createPoll () {
    dispatch ( addPoll({category:newPoll.category,question:newPoll.question,options:options.map(el=> el.option)}));        
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

function closeModal() {
    setIsOpen(false);
  }

    return (
    <div>
    <h1>My Dashboard</h1>
        
             
                 <button className="button-create-poll" type="button" onClick={openModal} > CREATE POLL  </button> 
                 <Modal 
        className="add-modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
      
       

    <h2>Create Poll</h2>     
 
  <div className="content">
   <div className="form-group"> 
     <input className="form-control" type="text" placeholder="Category" name="category"
      onChange={handleChange}/> 
      </div>               

   <div className="form-group"> 
      <input className="form-control" type="text" placeholder="Question" name="question"
       onChange={handleChange}/> 
      </div>
      
     
     <div className="options"> {

options.map((el,i)=>
<div className="form-group option" key={i}> 
<input className="form-control" type="text" placeholder="Option"  value={options.option}
name="option"  onChange = {event => handleChangeOptions(el.id, event)}/>
 
 <button className="actionOption" onClick={addOption}> + </button>
 <button className="actionOption" onClick={deleteOption}> - </button>
 </div>
 )} 



</div>

<div className="buttons">
    <button className="submit"
    onClick={()=>{
              createPoll();
              closeModal();
              alert(`A poll has been created with success ! 
              Category : ${newPoll.category}
              Question : ${newPoll.question}`)}} >  
              
              Submit Poll</button>

    <button className="actionModal" onClick={closeModal}>

              Close  </button>
 </div>


     </div>   

      </Modal>

      </div> 

    )
}

export default CreatePoll
