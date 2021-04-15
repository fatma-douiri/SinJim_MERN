const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });
const secretOrKey = process.env.secretOrKey;

//Register User
exports.register = async (req, res) => {
  const { userName, email, password, isAdmin , pollsCreated, pollsVoted} = req.body;

  const searchResult = await User.findOne({ email });

  if (searchResult) return res.status(401).json({ msg: "User already exists" });

  try {
    const newUser = new User({
      userName,
      email,      
      password,
      isAdmin,
      pollsCreated,
      pollsVoted,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    newUser.password = hash;
    await newUser.save();

     res.status(201).json( {newUser , msg : "User added successfully" });

  } catch (error) {

    console.log('Register error',error);
    res.status(501).json({ msg: "User added fail" });
  }
};

//Login User
exports.login = async (req, res) => {

  const {email, password} = req.body;
  

  const user = await User.findOne({ email });
  
  if (!user) return res.status(400).json({ msg: "Wrong email !" });

  const isMatch = await bcrypt.compare(password, user.password);


  if (!isMatch) return res.status(400).json({ msg: "Wrong password !" });

  try {
    const payload = {
      userName: user.userName,
      email: user.email,
      id: user._id,
    };
    
    const token = await jwt.sign(payload, secretOrKey);
    

    res.status(200).json({ token: `Bearer ${token}` });

  } catch (error) {
    console.log("Login error :", error);

    res.status(500).json({ msg: "Login fail !" });
  }
};

//Get All Users only from Admin

exports.getUsers = async (req, res) => {
  try {
  
    const users = await User.find().populate('pollsCreated',['category','id']) //  User.polls will be {"_id":"id poll du poll crée ce user", "category": "category du poll crée ce user"}
                              .populate('pollsVoted',['category','id']);
    res.status(200).json(users);

  } catch (err) {
    console.log("get users error", error);
    res.status(500).json({ msg: "Get Users fail !" });
    };
  
};

//Ban User only from Admin 

exports.banUser =(req,res)=>{
  
  let {id} =req.body;
    User
     .findOneAndRemove({id})
     .then(()=>res.send("Useer has been deleted successfully!"))
     .catch((err)=> res.send(err))
}

//Get Current User
exports.current = async (req,res)=>{
    let{_id}=req.user._id
    try{
      const currentUser = await User.findById({_id}).populate('pollsCreated',['category','id']) 
      .populate('pollsVoted',['category','id']);
       res.status(202).json(currentUser);

    }catch(err) {
      console.log("GET CURRENT USER ERRORS :", error);
      res.status(500).json({ msg: "Get Current User Fail !" });
      };
 }

 
//Edit User
 exports.editUser = async (req, res) => {
  let { _id } = req.params;
  await User.findByIdAndUpdate({ _id }, { $set: { ...req.body }} ,{new:true, useFindAndModify: false} )
    .then((newuser) => { 
    console.log(newuser);
               res.status(200).json({ newuser, updating: true })
    })
    .catch((err) => res.status(400).json(err));

}


