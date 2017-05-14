import {combineReducers} from "redux";

import {RECEIVE_JOBS, REQUEST_JOBS, SELECT_PAGE, RECEIVE_STATS} from "../actions";

const initialState = {
  keyword: '',
  jobs: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_JOBS:
    case RECEIVE_JOBS:
      var count = action.count || 0;
      var totalPages = Math.ceil(action.count / 20);
      var result = {...state, jobs: action.jobs, totalPages: totalPages};
      return result;
    case SELECT_PAGE:
      var currentPage = action.currentPage || 1;
      return {...state, currentPage: currentPage};
    case RECEIVE_STATS:
      return {...state, stats: action.stats};
    default:
      return {...state};
  }
};

const rootReducer = combineReducers({
  reducer
});

export default rootReducer;
