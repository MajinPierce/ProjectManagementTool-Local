import { combineReducers } from "redux";
import BacklogReducer from "./BacklogReducer";
import ErrorReducer from "./ErrorReducer";
import ProjectReducer from "./ProjectReducer";

export default combineReducers({
  errors: ErrorReducer,
  project: ProjectReducer,
  backlog: BacklogReducer,
});
