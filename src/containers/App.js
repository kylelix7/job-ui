import React from "react";
import PropTypes from "prop-types";
import {fetchJobs, selectPage} from "../actions";
import {connect} from "react-redux";
import {FilterableJobTable} from "../components/Job";
import {JobPieChart} from "../components/Report";
import {Tab, Tabs} from "react-bootstrap";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

  }

  static propTypes = {
    jobs: PropTypes.array,
    isFetching: PropTypes.bool,
    keyword: PropTypes.string,
    activePage: PropTypes.number,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchJobs({}));
  }

  componentWillReceiveProps(nextProps) {
  }

  handleSelect(page) {
    const {dispatch} = this.props;
    dispatch(fetchJobs({currentPage: page}));
    dispatch(selectPage(page));
  }

  render() {
    return (
      <div className="panel panel-default">
        <Tabs defaultActiveKey={1} id="nav-tab">
          <Tab eventKey={1} title="Jobs and Skills">
            <FilterableJobTable jobs={this.props.jobs}
                                totalPages={this.props.totalPages}
                                handleSelect={this.handleSelect}
                                currentPage={this.props.currentPage}/>
          </Tab>
          <Tab eventKey={2} title="Report">
            <JobPieChart />
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
    isFetching: false,
    keyword: ''
  };
};

export default connect(mapStateToProps)(App);
