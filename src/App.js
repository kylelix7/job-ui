import React, {Component} from "react";
import {FilterableJobTable, JOBS} from "./components/Job";
import "./App.css";

class App extends Component {
  render() {
    //return (<Dummy />);
    return (<FilterableJobTable jobs={JOBS}/>);
    /*
     return (
     <div className="App">
     <div className="App-header">
     <img src={logo} className="App-logo" alt="logo" />
     <h2>Welcome to Bank Jobs</h2>
     </div>
     <p className="App-intro">
     To get started, edit <code>src/App.js</code> and save to reload.
     </p>
     </div>
     );
     */
  }
}

export default App;
