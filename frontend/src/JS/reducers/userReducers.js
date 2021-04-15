import {   
    USER_REGISTER,    USER_REGISTER_FAIL,       USER_REGISTER_SUCCESS,
    USER_LOGIN,       USER_LOGIN_SUCCESS,       USER_LOGIN_FAIL,
    GET_PROFILE,      GET_PROFILE_SUCCESS,      GET_PROFILE_FAIL,
    GET_ALL_PROFILES, GET_ALL_PROFILES_SUCCESS, GET_ALL_PROFILES_FAIL,
    BAN_USER,         BAN_USER_SUCCESS,         BAN_USER_FAIL,
    EDIT_USER,        EDIT_USER_SUCCESS,        EDIT_USER_FAIL, 

    
      } from "../actionsType/userActionsType";

const initialState = {
        loading: false,
        errors: null,         
        isAuth: false,
        isAdmin : false,
        token:"",
        user:{},
        allUsers:[],
        bannedUser:{},
        editiedUser:{},
        
      };

const userReducers = (state = initialState, { type, payload }) => {
    switch (type) {
      case USER_REGISTER:
      case USER_LOGIN:
      case GET_PROFILE:
      case GET_ALL_PROFILES:
      case BAN_USER:
      case EDIT_USER:
         return {
          ...state,
          loading: true,
        };

      case USER_REGISTER_SUCCESS:        
        return {
            ...state,
            loading: false,
            isAuth:true,
            user: payload,
           
          };

      case USER_REGISTER_FAIL:
      case USER_LOGIN_FAIL:
      case GET_PROFILE_FAIL :
      case GET_ALL_PROFILES_FAIL:
      case EDIT_USER_FAIL:
      case BAN_USER_FAIL :

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
          // isAdmin: payload.isAdmin ? true : false
        };
      case GET_ALL_PROFILES_SUCCESS:
        return{
          ...state,
          loading: false,
          isAuth: true,
          isAdmin:true,
          allUsers :payload,
        }
      case BAN_USER_SUCCESS:
        return{
          ...state,
          loading:false,
          isAuth:true,
          isAdmin:true,
          bannedUser:payload,
        }
      case EDIT_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuth: true,
          editiedUser: payload,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducers;