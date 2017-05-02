export const FILTER = 'FILTER';
export const REQUEST_JOBS = 'REQUEST_JOBS';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';

export const requestJobs = filter => ({
  type: REQUEST_JOBS,
  filter
});

export const receiveJobs = (jobs, count) => ({
  type: RECEIVE_JOBS,
  jobs: jobs,
  count: count
});

export const fetchJobs = filter => dispatch => {
  console.log('fetchJobs in actions');
  dispatch(requestJobs(filter));
  return fetch("http://localhost:8080/api/jobs")
    .then(response => response.json())
    .then(json => dispatch(receiveJobs(json.jobs, json.count)));
};
