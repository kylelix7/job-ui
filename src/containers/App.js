import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import some actions from actions

class App extends React.Component {
  static propTypes = {
    jobs: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {

  } 

  render() {
    return <p>container</p>
  }
}

//[mapStateToProps(state, [ownProps]): stateProps] (Function): If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object*, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever the component receives new props (e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated).
const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps)(App);
