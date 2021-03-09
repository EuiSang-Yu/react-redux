import { combineReducers } from "redux";
import counter from "./counter";
import waiting from "./waiting";
export default combineReducers({
  counter,
  //다른 리듀서 만들면 여기에 추가해줌
  waiting
});
