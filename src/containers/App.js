import React from "react";
import PropTypes from "prop-types";
import {fetchJobs, fetchStats, fetchJobCount, selectPage, fetchSingleBankStats} from "../actions";
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
    dispatch(fetchSingleBankStats({'company': 'TD'}));
    dispatch(fetchSingleBankStats({'company': 'BMO'}));
    dispatch(fetchSingleBankStats({'company': 'RBC'}));
    dispatch(fetchSingleBankStats({'company': 'Scotiabank'}));
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
    var jumbotronStyle = {"margin": "20px 0px 20px 0px"};

    var containerStyle = {'top': '0', 'border-width': '0 0 1px'};
    return (
      <div className="panel panel-default" >
        <Tabs defaultActiveKey={1} id="nav-tab" style={style} responsive>
          <Tab eventKey={1} title="Jobs and Skills" >
            <div className="jumbotron" style={jumbotronStyle}>
              <h4>This website is dedicated to provide intuition of what hot IT skills are mentioned in technical jobs in major Canada's banks.</h4>
              <ul>
                <li>The job page briefly dispaly top 3 mentioned skills and the number they are mentioned in each jobs.</li>
                <li>The report shows most mentioned skills in all jobs. There are also breakdowns by banks.</li>
              </ul>

            </div>
            <FilterableJobTable jobs={this.props.jobs}
                                totalPages={this.props.totalPages}
                                handleSelect={this.handleSelect}
                                currentPage={this.props.currentPage} />
          </Tab>
          <Tab eventKey={2} title="Report" >
            <JobChart stats={this.props.stats} company={this.props.reportCompany}
                      rbc_stats={this.props.rbc_stats}
                      td_stats={this.props.td_stats}
                      scotiabank_stats={this.props.scotiabank_stats}
                      bmo_stats={this.props.bmo_stats}
                      onSelectorClick={this.props.onSelectorClick}
                      jobCount={this.props.jobCount} />
          </Tab>

       {/*   <Tab eventKey={3} title="Download free data">
            <h3>Data is exported from mongodb</h3>
            <a href="/public/jobs.json"> Download </a>
          </Tab>*/}
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
    rbc_stats: state.reducer.rbc_stats,
    td_stats: state.reducer.td_stats,
    scotiabank_stats: state.reducer.scotiabank_stats,
    bmo_stats: state.reducer.bmo_stats,
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
