import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import some actions from actions

class App extends React.Component {
  static propTypes = {
    jobs: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }
}
