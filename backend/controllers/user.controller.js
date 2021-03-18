const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });
const secretOrKey = process.env.secretOrKey;

//Register User
exports.register = async (req, res) => {
  const { userName, email, password,role} = req.body;

  const searchResult = await User.findOne({ email });

  if (searchResult) return res.status(401).json({ msg: "User already exists" });

  try {
    const newUser = new User({
      userName,
      email,      
      password,
      role
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    newUser.password = hash;

    await newUser.save();
    res.status(201).json({ msg: "User added successfully" });
  } catch (error) {
    console.log('Register error',error);
    res.status(501).json({ msg: "User added fail" });
  }
};

//Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "Wrong email !" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Wrong password !" });
 
  try {
    const payload = {
      userName: user.userName,
      email: user.email,
      role: user.role,
      id: user._id,
    };

    const token = await jwt.sign(payload, secretOrKey);
    res.status(200).json({ token: `Bearer ${token}` });

  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({ msg: "Login fail !" });
  }
};

//Get All Users only from Admin

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
  console.log(users)
    res.status(200).json(users);
  } catch (err) {
      console.log("get users error", error);
    res.status(500).json({ msg: "Get Users fail !" });
    };
  
};


//Delete User By Id : Ban User  only from Admin 

exports.banUser =(req,res)=>{
  
  let {_id} =req.params;
    User
     .findOneAndRemove({_id})
     .then(()=>res.send("Useer has been deleted successfully!"))
     .catch((err)=> res.send(err))
}


