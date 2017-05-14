export const FILTER = 'FILTER';
export const REQUEST_JOBS = 'REQUEST_JOBS';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';
export const SELECT_PAGE = 'SELECT_PAGE';
export const RECEIVE_STATS = 'RECEIVE_STATS';

export const requestJobs = filter => ({
  type: REQUEST_JOBS,
  filter
});

export const receiveJobs = (jobs, count) => ({
  type: RECEIVE_JOBS,
  jobs: jobs,
  count: count
});

export const receiveStats = stats => ({
  type: RECEIVE_STATS,
  stats: stats
});

export const selectPage = (currentPage) => ({
  type: SELECT_PAGE,
  currentPage: currentPage
});

export const fetchJobs = filter => dispatch => {
  console.log('fetchJobs in actions');
  var url = "http://localhost:8080/api/jobs";
  if (filter.currentPage) {
    url = url + '?page=' + (parseInt(filter.currentPage) - 1);
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveJobs(json.jobs, json.count)));
};

export const fetchStats = filter => dispatch => {
  console.log('fetchStatas in action');
  var url = "http://localhost:8080/api/stats";
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveStats(json)));
}; 
