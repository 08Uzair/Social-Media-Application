import { combineReducers } from "redux";
import post from "./post";
import auth from "./auth";
import bookmark from "./bookmark";
import story from "./story";

const rootReducer = combineReducers({
  post,
  auth,
  bookmark,
  story
});

export default rootReducer;
