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
      console.log('reducer - action: ');
      console.log(action.type);
      console.log(action);
      var result = {...state, jobs: action.jobs};
      console.log(result);
      return result;
    default:
      return {...state};
  }
};

const rootReducer = combineReducers({
  reducer
});

export default rootReducer;
