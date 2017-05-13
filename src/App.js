import React, {Component} from "react";
import {FilterableJobTable, JOBS} from "./components/Job";
import "./App.css";

class App extends Component {
  render() {
    //return (<Dummy />);
    return (<FilterableJobTable jobs={JOBS}/>);
  }
}

export default App;
