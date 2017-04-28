export function fetchJobs() {
  return function(dispatch) {
    dispatch({type: 'FETCH_JOBS_REQUEST'});
    return fetch('').
  }
}
