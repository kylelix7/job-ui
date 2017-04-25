import React from "react";

class JobRow extends React.Component {
  render() {
    return <tr><th>{this.props.title}</th></tr>;
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

