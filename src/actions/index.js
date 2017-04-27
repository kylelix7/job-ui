export const filter = (filterObject) => ({
  type: 'FILTER',
  filter_object: filterObject
})

export const clickJob = (job) => ({
  type: 'CLICK_JOB',
  job
})


