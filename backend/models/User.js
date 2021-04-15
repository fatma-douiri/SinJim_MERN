const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userName:     { type: String, required: true },
  email:        { type: String, required: true },
  password:     { type: String , required: true},
  isAdmin:      { type:Boolean, default:false} , //0 for Admin , 1 for User
  pollsCreated:[{ type: mongoose.Schema.Types.ObjectId, ref: 'poll' }],
  pollsVoted:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'poll' }],
  
});

module.exports = User = mongoose.model("user", userSchema);
