import {   
    ADD_POLL,         ADD_POLL_SUCCESS,         ADD_POLL_FAIL,
    GET_ALL_POLLS,    GET_ALL_POLLS_SUCCESS,    GET_ALL_POLLS_FAIL,
    GET_POLL,         GET_POLL_SUCCESS,         GET_POLL_FAIL,
    EDIT_POLL,        EDIT_POLL_SUCCESS,        EDIT_POLL_FAIL,
    DELETE_POLL,      DELETE_POLL_SUCCESS,      DELETE_POLL_FAIL,
    VOTE_POLL,        VOTE_POLL_SUCCESS,        VOTE_POLL_FAIL,
    GET_VOTED_POLLS,  GET_VOTED_POLLS_SUCCESS,  GET_VOTED_POLLS_FAIL, 
    
    
      } from "../actionsType/pollActionsType";

      const initialState = {
        loading: false,
        errors: null,
        newPoll:{},
        allPolls:[],
        poll:{},
        modifiedPoll:{},
        deletedPoll:{},
        votedPoll: {},
        allVotedPolls:[],
        
      };


const pollReducers = (state = initialState, { type, payload }) => {
    switch (type) {
      case ADD_POLL:
      case GET_ALL_POLLS:
      case GET_POLL:
      case EDIT_POLL:
      case DELETE_POLL:
      case VOTE_POLL:
      case GET_VOTED_POLLS:
       return {
          ...state,
          loading: true,
        };

      case ADD_POLL_SUCCESS:        
        return {
            ...state,
            loading: false,
            newPoll: payload,
          };

      
      case GET_ALL_POLLS_SUCCESS:
        return{
          ...state,
          loading:  false,
          allPolls: payload
        }

      case GET_POLL_SUCCESS:
        return{
          ...state,
          loading: false,
          poll:    payload
      
        }
      case EDIT_POLL_SUCCESS:
        return{
          ...state,
          loading:      false,
          modifiedPoll: payload
        }
         
      case DELETE_POLL_SUCCESS:
        return{
          ...state,
          loading:     false,
          deletedPoll: payload

        }

      case VOTE_POLL_SUCCESS:
        return{
          ...state,
          loading:   false,
          votedPoll: payload
          
        }
      
      case GET_VOTED_POLLS_SUCCESS:
        return{
          ...state,
          loading:       false,
          allVotedPolls: payload

        }


      case ADD_POLL_FAIL:
      case GET_ALL_POLLS_FAIL:
      case GET_POLL_FAIL:
      case EDIT_POLL_FAIL:
      case DELETE_POLL_FAIL:
      case VOTE_POLL_FAIL:
      case GET_VOTED_POLLS_FAIL:
        
        return {
          ...state,
          loading: false,
          errors:  payload,
        };
      
  
      default:
        return state;
    }
  };
  
  export default pollReducers;