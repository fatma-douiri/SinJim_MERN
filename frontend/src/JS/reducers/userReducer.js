import {   
    USER_REGISTER, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,
    USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL,

    
      } from "../actionsType/userActionsType";

const initialState = {
        loading: false,
        errors: null,
        user:null,
        isAuth: false,
      };

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case USER_REGISTER:
      case USER_LOGIN:
        case GET_PROFILE:
         return {
          ...state,
          loading: true,
        };

      case USER_REGISTER_SUCCESS:        
        return {
            ...state,
            loading: false,
            user: payload,
          };

      case USER_REGISTER_FAIL:
      case USER_LOGIN_FAIL:
        case GET_PROFILE_FAIL :      
        return {
          ...state,
          loading: false,
          errors: payload,
        };
      
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuth: true,
          token: payload,
        };
        
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuth: true,
          user: payload,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;