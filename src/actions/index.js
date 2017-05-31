export const FILTER = 'FILTER';
export const REQUEST_JOBS = 'REQUEST_JOBS';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';
export const SELECT_PAGE = 'SELECT_PAGE';
export const RECEIVE_STATS = 'RECEIVE_STATS';


function convertObjectElementsToArray(obj) {
  if (!obj) {
    return [];
  }
  var arr = [];
  // need to get the actual object this way. monggose
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var newKey = key.replace(/-/g, "."); // handle any key containing the dot
      arr.push({name: newKey, value: obj[key]});
    }
  }

  return arr;
}
export const requestJobs = filter => ({
  type: REQUEST_JOBS,
  filter
});

export const receiveJobs = (jobs, count) => ({
  type: RECEIVE_JOBS,
  jobs: jobs,
  count: count
});

export const receiveStats = (stats, company) => ({
  type: RECEIVE_STATS,
  stats: stats,
  company: company
});

export const selectPage = (currentPage) => ({
  type: SELECT_PAGE,
  currentPage: currentPage
});

const hostName() {

}
export const fetchJobs = filter => dispatch => {
  var url = "/api/jobs";
  if (filter.currentPage) {
    url = url + '?page=' + (parseInt(filter.currentPage, 10) - 1);
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      // convert the stats json object to array for sorting
      var jobs = json.jobs;
      for (var i = 0; i < jobs.length; i++) {
        var jobStats = jobs[i].stats;
        if (jobs[i].stats && Array.isArray(jobs[i].stats) && jobs[i].stats.length > 0) {
          jobStats = jobs[i].stats[0];
        }
        jobStats = convertObjectElementsToArray(jobStats);
        jobStats.sort(function (a, b) {
          if (a.value === b.value) {
            return 0;
          }
          if (!a.value) {
            return 1;
          }
          if (!b.value) {
            return -1;
          }
          if (a.value < b.value)
            return 1;
          else (a.value > b.value);
          return -1;
        });
        jobs[i].stats = jobStats;
      }
      return dispatch(receiveJobs(json.jobs, json.count));
    });
};

export const fetchStats = filter => dispatch => {
  var url = "/api/stats";
  var company = null;
  if (filter && filter.company && isCompanyValid(filter.company)) {
    company = filter.company;
    url = url + '?company=' + company;
  }

  return fetch(url, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(json => dispatch(receiveStats(json, company)));
};

const isCompanyValid = company => {
  return (company === "TD" || company === "RBC" || company === "BMO" || company === "Scotiabank");
}