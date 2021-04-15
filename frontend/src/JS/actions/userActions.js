import {   
    USER_REGISTER,    USER_REGISTER_SUCCESS,     USER_REGISTER_FAIL,
    USER_LOGIN,       USER_LOGIN_SUCCESS,        USER_LOGIN_FAIL,
    GET_PROFILE,      GET_PROFILE_SUCCESS,       GET_PROFILE_FAIL,
    GET_ALL_PROFILES, GET_ALL_PROFILES_SUCCESS,  GET_ALL_PROFILES_FAIL,
    BAN_USER,         BAN_USER_SUCCESS,          BAN_USER_FAIL,
    EDIT_USER,        EDIT_USER_SUCCESS,         EDIT_USER_FAIL,
      } from "../actionsType/userActionsType";

import axios from "axios";

//Register User
export const addUser = (newUser) => async (dispatch) => {
    dispatch({ type: USER_REGISTER });
    
    try {
      const addedUser = await axios.post("/user/register", newUser);

      

      dispatch({ type: USER_REGISTER_SUCCESS, payload: addedUser.data });

    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.response});
    }
  };

//User Login
export const userLogin = (loginCred) => async (dispatch) => {
  dispatch({ type: USER_LOGIN });

  try {
    const userLogin = await axios.post("/user/login", loginCred);
    console.log("Login :",userLogin)

    localStorage.setItem("token", userLogin.data.token);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userLogin.data.token });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response});
    console.log("USER LOGIN ERRORS :",error)
  }
};

//Get User Current Profile
export const getProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE });

  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const user = await axios.get("/user/current", config);
    console.log("GET PROFILE : USER :",user)

    dispatch({ type: GET_PROFILE_SUCCESS, payload: user.data });

    
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data });
    console.log("GET PROFILE : ERRORS :",error)
  }
};

//Get All Profiles Users : only from Admin
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PROFILES });

  try {
    const token = localStorage.getItem("token");

    const config = {
     headers: {
        Authorization: token,
      },
    };

    const allUsers = await axios.get("/user/getAllUsers", config);

    dispatch({ type:GET_ALL_PROFILES_SUCCESS, payload: allUsers.data });
  } catch (error) {
    dispatch({ type: GET_ALL_PROFILES_FAIL, payload: error.response.data });
  }
};

//Ban User only from Admin
export const banUser = (id) => async (dispatch) => {
  dispatch({ type: BAN_USER });

  try {
    const token = localStorage.getItem("token");

    const config = {
     headers: {
        Authorization: token,
      },
    };

    const bannedUser = await axios.delete("/user/banUser" ,id, config);

    dispatch({ type:BAN_USER_SUCCESS, payload: bannedUser.data });
  } catch (error) {
    dispatch({ type: BAN_USER_FAIL, payload: error.response.data });
  }
};

//Edit User By Id
export const editUser = (id , edit) => async (dispatch) => {
  dispatch({ type: EDIT_USER });

  try {
    const token = localStorage.getItem("token");

    const config = {
     headers: {
        Authorization: token,
      },
    };

    const editiedUser = await axios.put(`/user/edit/${id}` , edit, config);

    dispatch({ type:EDIT_USER_SUCCESS, payload: editiedUser.data });
  } catch (error) {
    dispatch({ type: EDIT_USER_FAIL, payload: error.response.data });
  }
};
