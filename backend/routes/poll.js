const express = require('express')
const router = express.Router()
const {addPoll, getAllPolls,getPoll,editPoll,deletePoll,vote,getVotedPolls} = require('../controllers/poll.controllers')
const {isAdmin} = require('../middelwere/isAdmin')
const isAuth = require('../middelwere/passport-setup')



//Add new Poll 
//@ api http://localhost:8080/polls/addPoll // only from admin

router.post('/addPoll',isAuth(),isAdmin, addPoll)

//Get All Polls  
//@ api http://localhost:8080/polls/getAllPolls

router.get('/getAllPolls', getAllPolls)


//Get Poll  By Id 
//@ api http://localhost:8080/polls/getPoll/:id

router.get('/getPoll/:_id', getPoll)


//Update Poll               
//@ api http://localhost:8080/polls/updatePoll/:id

router.put('/edit/:_id',isAuth(),isAdmin,editPoll)

//Delete Poll                
//@ api http://localhost:8080/polls/deletePoll/:id

router.delete('/delete/:id',isAuth(),isAdmin,deletePoll)

//Vote to Poll                
//@ api http://localhost:8080/polls/vote/:id

router.post('/vote/:id',isAuth(), vote)

//Get All Voted Polls          
//@ api http://localhost:8080/polls/pollsVoted/:id

router.get('/allVotedPolls',isAuth(), getVotedPolls)



module.exports = router;








// const {addPoll} = require('../controllers/poll.controllers')

// //Add New Poll only from Admin @ api http://localhost:8080/polls/addPoll

// router.post('/addPoll', addPoll)


//Get All Polls  @ api http://localhost:8080/polls

//Get Poll by Id USER voted @ api http://localhost:8080/polls/_id

//module.exports = router;