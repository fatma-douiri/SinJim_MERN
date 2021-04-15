import React ,{useEffect,useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getAllPolls,getPoll} from '../../JS/actions/pollActions'
import PollAnswer from '../PollAnswer/PollAnswer'

import './listPolls.css'



const ListPolls = () => {
    
const allPolls  = useSelector((state) => state.pollReducers.allPolls);
const [myCategory,SetMyCategory]=useState("All Categories")

const dispatch=useDispatch()

useEffect (() => {
dispatch(getAllPolls())

   }, []);

  
 const categories =allPolls.map(el=>el.category)  



 const handleChange=(e)=>{
       const selectedCategory=e.target.value
       SetMyCategory(selectedCategory)
       console.log("MyCategory",myCategory) }
 

    return (
    <div className="listPolls">
<div claassName="container p-5" style={{marginRight:"25%"}}>
      <select className="custom-select" onChange={handleChange}>
      <option value="All" selected>All Categories</option>
           { categories.map((category)=>(<option value={category}  >{category}</option>))}
      </select>

      

</div>
           {allPolls
             .filter(el => myCategory !=="All Categories" ? el.category=== myCategory: el)
             .map((el, i) => (
                
                 <PollAnswer id={el._id} el={el} key={i}/>
            
           )
           )}
             
        
        </div>

        )}

export default ListPolls

