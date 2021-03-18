const mongoose = require('mongoose');
const schema = mongoose.Schema;


const optionSchema = new mongoose.Schema({
    option: String,
    votes: Number,
  });
  
const pollSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user' },
   
    question: String,
    options: [optionSchema],
    usersVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  });

  module.exports = Poll = mongoose.model("poll", userSchema);
  