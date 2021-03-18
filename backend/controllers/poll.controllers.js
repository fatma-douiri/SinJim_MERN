const Poll = require("../models/Poll");

//Add New Poll only from Admin @ api http://localhost:8080/add-poll
exports.addPoll = async (req, res) => {
    const {_id} =req.params;
    const { question, options } = req.body;
    
   try {
      const user = await User.findById({_id});

      const newPoll = new Poll({
        user,
        question,     
        options: options.map (option => ({ option })),

      });

     await user.polls.push(newPoll._id);

      await user.save();
  
      return res.status(201).json({ ...poll, user: user._id });
          
    } catch (error) {
      console.log('Added Poll error',error);
      res.status(501).json({ msg: "Poll added fail" });
    }
  };

// //Get All Polls  @ api http://localhost:8080/polls

// exports.showPolls = async (req, res) => {
//     try {
//       const polls = await Poll.find()
      
  
//       return res.status(200).json(polls);
      
//     } catch  (error) {
//             console.log('Get Polls error',error);
//             res.status(501).json({ msg: "Get Polls fail" });
//       };
    
//   };

//Get Poll by Id USER voted @ api http://localhost:8080/polls/_id