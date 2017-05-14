import {connect} from "react-redux";
import {clickJob} from "../actions";

const getVisibleJobs = (jobs, filter) => { // probably don't need jobs
                                           // fetch data with filter
  return null;
};

const mapStateToProps = (state) => ({
  jobs: getVisibleJobs(state.jobs, state.filter)
});

const VisibleJobList = connect(
  mapStateToProps,
  null,
)(JobList);

export default VisibleJobList;

