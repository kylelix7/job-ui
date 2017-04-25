import React from "react";
import td_logo from "../assets/TD.jpg"
import bmo_logo from "../assets/BMO.jpg"
import scotia_logo from "../assets/Scotiabank.jpg"
import rbc_logo from "../assets/RBC.jpg"

class JobRow extends React.Component {
  selectImage(bank) {
    if(bank == "TD") {
      return td_logo;
    } else if(bank == "BMO") {
      return bmo_logo;
    } else if(bank == "Scotiabank") {
      return scotia_logo;
    } else if(bank == "RBC") {
      return rbc_logo;
    } else {
      return "";
    }
  }
  render() {
    var logo = this.selectImage("Scotiabank");
    return <tr><th><img src={logo} alt="bank logo" height="42" width="42" />{this.props.title}</th></tr>;
  }
}

class JobTable extends React.Component {
  render() {
    var rows = [];
    this.props.jobs.forEach(function(job) {
      rows.push(<JobRow title={job.title} key={job.id}/>);
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Keyword..." />
      </form>
    );
  }
}

export class FilterableJobTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <JobTable jobs={this.props.jobs} />
      </div>
    );
  }
}

class Dummy extends React.Component {
  render() {
    return (<p> hello </p>);
  }
}

export const JOBS = [
  {title: "software developer", company: "TD", id: "TD1"},
  {title: "software engineer", company: "Scotiabank", id: "Scotiabank1"},
  {title: "blockchain develoer", company: "BMO", id: "Bmo1"},
  {title: "UI/UX designer", company: "RBC", id: "RBC1"},
  {title: "project manager", company: "TD", id: "TD2"}
];

