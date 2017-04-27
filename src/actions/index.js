export const FILTER = 'FILTER';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';

export const receiveJobs = (filterObject) => ({
  type: 'FILTER',
  filter_object: filterObject
});


