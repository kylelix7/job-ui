import React from 'react';
import PropTypes from 'prop-types';
import { fetchJobs } from '../actions';
import { connect } from 'react-redux';
import { FilterableJobTable } from '../components/Job';

class App extends React.Component {
  static propTypes = {
    jobs: PropTypes.array,
    isFetching: PropTypes.bool,
//    dispatch: PropTypes.func.isRequired,
    keyword: PropTypes.string,
    activePage: PropTypes.number,
    totalPages: PropTypes.number
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { dispatch } = this.props;
    dispatch(fetchJobs({})); // TODO
  }

  componentWillReceiveProps(nextProps) {
  } 

  render() {
    return <FilterableJobTable jobs={this.props.jobs} totalPages={this.props.totalPages} />;
  }
}

//[mapStateToProps(state, [ownProps]): stateProps] (Function): If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object*, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever the component receives new props (e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated).
const mapStateToProps = state => {
  console.log('mapStateToProps');
  console.log(state.reducer.jobs);
  return {
    jobs: state.reducer.jobs,
    totalPages: state.reducer.totalPages,
    isFetching: false,
    //dispatch: function(){console.log('abcd')},
    keyword: ''
  };
}

export default connect(mapStateToProps)(App);
