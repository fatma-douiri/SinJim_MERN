const User = require('../models/User');
const Poll = require('../models/Poll');
const { findById } = require('../models/User');


//Create Poll
exports.addPoll = async (req, res, next) => {

 const id = req.user._id
 console.log('ADD POLL : id user who created poll :', id) 

  const {category, question, options } = req.body;

  try {
    
    const user = await User.findById(id);
    console.log('ADD POLL :User who created poll :', user)


    const newPoll = new Poll({
      category,
      question,
      options: options.map( option => ({ option, votes : 0})), // options = [{option},{option},...] With {option} = {'option'='String','votes'=Number}
      userWhoCreated : user._id
      
      
    });
    

    await newPoll.save();
    console.log('ADD POLL : poll created:',newPoll)


    user.pollsCreated.push(newPoll._id); //Fill in the array user.pollsCreated with the id of the poll created
    await user.save();
    
    

    return res.status(201).json(newPoll); 

    
  } catch (error) {

    console.log('Add poll error',error);
    res.status(401).json({ 'msg': error.message });
  }
  
  
};


//Get All Polls 
exports.getAllPolls = async (req, res,next) => {
  try {

   const allPolls = await Poll.find().populate('userWhoCreated', ['userName', 'id'])
   .populate('usersWhoVoted', ['userName', 'id',]); 

   console.log(allPolls)
    
    return res.status(200).json(allPolls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

//Get Poll By Id
exports.getPoll = async (req, res, next) => {
  
  
  try {

    const {_id} = req.params;
    
    const poll = await Poll.findById({_id}).populate('userWhoCreated', ['userName', 'id'])
.populate('usersWhoVoted', ['userName', 'id',])
    
    if (!poll) return res.status(400).json({ msg: "Poll Not Found !" });

    return res.status(200).json(poll);
  } catch  (error) {

    console.log('GET ALL POLLS ERRORS',error);
    res.status(401).json({ 'msg': error.message });
  
  }
};

//Update Poll Only from Admin

 exports.editPoll = async (req, res) => {
  let { _id } = req.params;
  await Poll.findByIdAndUpdate({ _id }, { $set: { ...req.body }} ,{new:true, useFindAndModify: false} )
    .then((modifiedPoll) => { 
               console.log(modifiedPoll);
               res.status(200).json({ modifiedPoll, updating: true })
    })
    .catch((err) => res.status(400).json(err));

}


//Delete Poll only from Admin
exports.deletePoll = async (req, res, next) => {
  const { id: pollId } = req.params;
  
  try {
   
    const deletedPoll = await Poll.findById(pollId);
    if (!deletedPoll) return res.status(400).json({ msg: "Poll Not Found !" });
        
    await deletedPoll.remove();
    return res.status(202).json({deletedPoll, deleted: true });

  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

//Voting to Poll
exports.vote = async (req, res, next) => {

  const { id: pollId } = req.params;
  const { _id } = req.user._id;
  const { answer } = req.body;
  console.log( "POLL CONTROLLERS: VOTE : REQ: ", req )
 
  try {
    if (answer) {
      const poll = await Poll.findById(pollId);
      if (!poll) return res.status(400).json({ msg: "Poll Not Found !" });
      
      const vote = poll.options.map(
        option =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
              }
            : option,
      );

      console.log('VOTE: USERID :', _id);
      console.log('VOTE: poll.usersVoted ', poll.usersWhoVoted);
      console.log(
        'VOTE: length usersVoted filter par userId',
        poll.usersWhoVoted.filter(user => user.toString() === _id.toString()).length,
      );
      const user = await User.findById(_id);

      if (poll.usersWhoVoted.filter(user => user.toString() === _id.toString()).length <= 0) {
                  
        console.log('poll created:', poll)

                  poll.usersWhoVoted.push(_id);
                  poll.options = vote;
                  await poll.save();

                  
                  user.pollsVoted.push(poll._id);
                  await user.save();
                    
        return res.status(202).json(poll);
              
                    
           } else {
                    return res.status(400).json({ msg: 'User Already voted' });
        }
    } else {
                    return res.status(400).json({ msg: 'No Answer Provided'}); 
    }


  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

//Get All Voted Polls by USER 
//@ api http://localhost:8080/polls/pollsVoted
exports.getVotedPolls = async (req, res, next) => {
 
  try {
    
    const allVotedPolls = await req.user.pollsVoted.map(id=>id)

         // console.log(allPollsVoted)
    return res.status(200).json({allVotedPolls});
    
  } catch (err) {
    console.log('Error Get Voted Polls  :',err);
    return next({ 
      status: 400,
      message: err.message,
   });
  }
};

