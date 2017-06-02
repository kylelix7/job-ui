import React from "react";
import PropTypes from "prop-types";
import {fetchJobs, fetchStats, fetchJobCount, selectPage} from "../actions";
import {connect} from "react-redux";
import {FilterableJobTable} from "../components/Job";
import {JobChart} from "../components/Report";
import {Tab, Tabs} from "react-bootstrap";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  static propTypes = {
    isFetching: PropTypes.bool,
    keyword: PropTypes.string,
    activePage: PropTypes.number,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    stats: PropTypes.array,
    rbc_stats: PropTypes.array,
    td_stats: PropTypes.array,
    scotiabank_stats: PropTypes.array,
    bmo_stats: PropTypes.array,
    jobCount: PropTypes.number
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchJobs({}));
    dispatch(fetchStats());
    dispatch(fetchJobCount());
  }

  componentWillReceiveProps(nextProps) {
  }

  handleSelect(page) {
    const {dispatch} = this.props;

    // if currentPage is undefined and page is 0, skip
    // if currentPage is equal to page, skip
    if (!(this.props.currentPage && this.props.currentPage === page)
      && !((!this.props.currentPage) && page === 0)) {
      dispatch(fetchJobs({currentPage: page}));
      dispatch(selectPage(page));
    }
  }

  render() {
    var style = {
      "margin": "20px 60px 20px 60px"
    };
    var containerStyle = {width: '100%'};
    return (
      <div className="panel panel-default" >
        <Tabs defaultActiveKey={1} id="nav-tab" style={style}>
          <Tab eventKey={1} title="Jobs and Skills" >
            <FilterableJobTable jobs={this.props.jobs}
                                totalPages={this.props.totalPages}
                                handleSelect={this.handleSelect}
                                currentPage={this.props.currentPage} />
          </Tab>
          <Tab eventKey={2} title="Report" >
            <JobChart stats={this.props.stats} company={this.props.reportCompany}
                      onSelectorClick={this.props.onSelectorClick}
                      jobCount={this.props.jobCount} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

//[mapStateToProps(state, [ownProps]): stateProps] (Function): If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object*, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever the component receives new props (e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated).
const mapStateToProps = state => {
  return {
    jobs: state.reducer.jobs,
    totalPages: state.reducer.totalPages,
    currentPage: state.reducer.currentPage,
    stats: state.reducer.stats,
    reportCompany: state.reducer.reportCompany,
    jobCount: state.reducer.jobCount,
    isFetching: false,
    keyword: ''
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    onSelectorClick: (reportCompany) => {
      dispatch(fetchStats({'company': reportCompany}));
      dispatch(fetchJobCount({'company': reportCompany}));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
