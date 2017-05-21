import {combineReducers} from "redux";

import {RECEIVE_JOBS, RECEIVE_STATS, REQUEST_JOBS, SELECT_PAGE} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_JOBS:
    case RECEIVE_JOBS:
      var count = action.count || 0;
      var totalPages = Math.ceil(count / 20);
      var result = {...state, jobs: action.jobs, totalPages: totalPages};
      return result;
    case SELECT_PAGE:
      var currentPage = action.currentPage || 1;
      return {...state, currentPage: currentPage};
    case RECEIVE_STATS:
      if (!action.company) {
        return {...state, stats: action.stats};
      }
      switch (action.company) {
        case "TD":
          return {...state, td_stats: action.stats};
        case "RBC":
          return {...state, rbc_stats: action.stats};
        case "Scotiabank":
          return {...state, scotiabank_stats: action.stats};
        case "BMO":
          return {...state, bmo_stats: action.stats};
      }
    default:
      return {...state};
  }
};

const rootReducer = combineReducers({
  reducer
});

export default rootReducer;
