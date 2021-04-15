import { combineReducers } from "redux";
import userReducers from "./userReducers";
import pollReducers from "./pollReducers";
const rootReducer = combineReducers({
  userReducers,
  pollReducers,
});

export default rootReducer;