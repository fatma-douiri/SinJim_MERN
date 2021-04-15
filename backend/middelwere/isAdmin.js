
const User = require("../models/User");



exports.isAdmin = async (req,res,next) =>{
  
  let id =req.user._id;
  console.log(id)

  try{
    let user = await User.findById(id)
    console.log(user)

    user.isAdmin ? next() :  res.status(500).json({"isAdmin" : user.isAdmin })

  }catch(err) {
   console.log("isAdmin Errorss", err);
   
};

}




