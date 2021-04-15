import {   
    ADD_POLL,         ADD_POLL_SUCCESS,         ADD_POLL_FAIL, 
    GET_ALL_POLLS,    GET_ALL_POLLS_SUCCESS,    GET_ALL_POLLS_FAIL,
    GET_POLL,         GET_POLL_SUCCESS,         GET_POLL_FAIL,
    EDIT_POLL,        EDIT_POLL_SUCCESS,        EDIT_POLL_FAIL,
    DELETE_POLL,      DELETE_POLL_SUCCESS,      DELETE_POLL_FAIL,
    VOTE_POLL,        VOTE_POLL_SUCCESS,        VOTE_POLL_FAIL,
    GET_VOTED_POLLS,  GET_VOTED_POLLS_SUCCESS,  GET_VOTED_POLLS_FAIL,
    
    
      } from "../actionsType/pollActionsType";

import axios from "axios";

//Add new Poll
export const addPoll = (newPoll) => async (dispatch) => {
    dispatch({ type: ADD_POLL });
    
    try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    console.log("ADDPOLL: config:",config)
      const addedPoll = await axios.post("/polls/addPoll",  newPoll, config);
      console.log("ADDPOLL: addedPoll:",addedPoll)
  
      
      
      dispatch({ type: ADD_POLL_SUCCESS, payload: addedPoll.data });
    } catch (error) {

      dispatch({ type: ADD_POLL_FAIL, payload: error.response.data });
      console.log("ADDPOLL: ERRORS:",error.response)
    }
  };

//Get All Polls
export const getAllPolls = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POLLS });

  try {
    
    const allPolls = await axios.get("/polls/getAllPolls");

    dispatch({ type:GET_ALL_POLLS_SUCCESS, payload: allPolls.data });
    console.log("GET ALL POLLS: ALL POLLS",allPolls.data)
  } catch (error) {
    dispatch({ type: GET_ALL_POLLS_FAIL, payload: error.response });
    console.log("GET ALL POLLS: ERRORS",error)
  }
};

//Get Poll By Id   
export const getPoll = (id) => async (dispatch) => {
  
  dispatch({ type: GET_POLL });

  try {
    
    const poll = await axios.get(`/polls/getPoll/${id}`);

    dispatch({ type:GET_POLL_SUCCESS, payload: poll.data });

  } catch (error) {
    dispatch({ type: GET_POLL_FAIL, payload: error.response.data });
  }
};

//Edit Poll By Id
export const editPoll = (id , edit) => async (dispatch) => {
  dispatch({ type: EDIT_POLL });

  try {
    const token = localStorage.getItem("token");

    const config = {
     headers: {
        Authorization: token,
      },
    };

    const modifiedPoll = await axios.put(`/polls/edit/${id}`, edit ,config );

    dispatch({ type:EDIT_POLL_SUCCESS, payload: modifiedPoll.data });
  } catch (error) {
    dispatch({ type: EDIT_POLL_FAIL, payload: error.response.data });
  }
};

//Delete Poll By Id
export const deletePoll = (id) => async (dispatch) => {
  dispatch({ type: DELETE_POLL });

  try {
    const token = localStorage.getItem("token");

    const config = {
     headers: {
        Authorization: token,
      },
    };

    const deletedPoll = await axios.delete(`/polls/delete/${id}`, config );

    dispatch({ type:DELETE_POLL_SUCCESS, payload: deletedPoll.data });
  } catch (error) {
    dispatch({ type: DELETE_POLL_FAIL, payload: error.response.data });
  }
};

//Vote To Poll
export const votePoll = (id,answer) => async (dispatch) => {
  
  const token = localStorage.getItem("token");

  const config = {
   headers: {
      Authorization: token,
    },
  };
  
  dispatch({ type: VOTE_POLL });

  try {
   

    const votedPoll = await axios.post(`/polls/vote/${id}`,answer, config );

    dispatch({ type:VOTE_POLL_SUCCESS, payload: votedPoll.data });

   

  } catch (error) {

    dispatch({ type: VOTE_POLL_FAIL, payload: error.response.data });
    console.log("VOTEPOLL : ERRORS :",error.response)
  }
};

//Get All Voted Polls
export const getVotedPolls =() => async (dispatch)=>{
  dispatch({ type: GET_VOTED_POLLS });

  try{
    const token = localStorage.getItem("token");

    const config = {
     headers: {
        Authorization: token,
      },
    };
    const allVotedPolls = await axios.post("/polls/allVotedPolls",config );
    dispatch({ type:GET_VOTED_POLLS_SUCCESS, payload: allVotedPolls.data });




  }catch (error) {
    dispatch({ type: GET_VOTED_POLLS_FAIL, payload: error.response.data });
  }



}
