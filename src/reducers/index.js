import { combineReducers } from 'redux';

import { 
  REQUEST_JOBS, RECEIVE_JOBS
} from '../actions';

const initialState = {
  keyword: '',
  jobs: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_JOBS:
    case RECEIVE_JOBS:
      var totalPages = action.count / 20;
      var result = {...state, jobs: action.jobs, totalPages: totalPages};
      return result;
    default:
      return {...state};
  }
};

const rootReducer = combineReducers({
  reducer
});

export default rootReducer;
