import { connect } from 'react-redux';
import { clickJob } from '../actions';
import { JobList } from '../components/Job'

const getVisibleJobs = (jobs, filter) => { // probably don't need jobs
  // fetch data with filter
  return null;
}

const mapStateToProps = (state) => ({
  jobs: getVisibleJobs(state.jobs, state.filter)
})

const mapDispatchToProps = {
  onJobClick: (job) => {
    dispatch(clickJob(job));
  }
}

const VisibleJobList = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobList)

export default VisibleJobList;

