const mongoose = require('mongoose');
const schema = mongoose.Schema;


const optionSchema = new mongoose.Schema({
    option: String,
    votes: {type:Number,
            default:0}
  });

  
const pollSchema = new mongoose.Schema({
    category: String,
    question: String,
    options: [optionSchema],
    userWhoCreated:[{type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    usersWhoVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  });

  module.exports = Poll = mongoose.model("poll", pollSchema);
  