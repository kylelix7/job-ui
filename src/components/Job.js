import React from "react";
import td_logo from "../assets/TD.jpg";
import bmo_logo from "../assets/BMO.jpg";
import scotia_logo from "../assets/Scotiabank.jpg";
import rbc_logo from "../assets/RBC.jpg";
import Button from "react-bootstrap/lib/Button";
import Pagination from "react-bootstrap/lib/Pagination";

export const JOBS = [
  {title: "software developer", company: "TD", id: "TD1"},
  {title: "software engineer", company: "Scotiabank", id: "Scotiabank1"},
  {title: "blockchain develoer", company: "BMO", id: "Bmo1"},
  {title: "UI/UX designer", company: "RBC", id: "RBC1"},
  {title: "project manager", company: "TD", id: "TD2"}
];

class JobRow extends React.Component {
  selectImage(bank) {
    if (bank === "TD") {
      return td_logo;
    } else if (bank === "BMO") {
      return bmo_logo;
    } else if (bank === "Scotiabank") {
      return scotia_logo;
    } else if (bank === "RBC") {
      return rbc_logo;
    } else {
      return "";
    }
  }

  getStyle(value) {
    var styleRed = {"backgroundColor": "#FF0000", "color": "#FFFFFF"};
    var styleBlue = {"backgroundColor": "#0000cd", "color": "#FFFFFF"};
    var styleGreen = {"backgroundColor": "#006400", "color": "#FFFFFF"};
    if (value >= 5) {
      return styleRed;
    } else if (value >= 2) {
      return styleBlue;
    } else {
      return styleGreen;
    }
  }

  render() {
    var logo = this.selectImage(this.props.company);
    var style = {'margin': '10px'};
    var divStyle = {'float': 'right'};
    var stats = this.props.stats;
    var statsDiv = null;
    var titleStyle = {'float': 'left'};

    if(this.props.post_date) {
      var date = new Date(this.props.post_date);
      var str = date.toISOString().substring(0, 10);
    }

    if (stats && stats.length > 2) {
      var buttons = [];
      if (stats[0].value > 0) {
        buttons.push(<Button key={this.props.company + "top1"} className='btn-xs'
                             style={this.getStyle(stats[0].value)}> {stats[0].name} {stats[0].value}</Button>);
      }
      if (stats[1].value > 0) {
        buttons.push(<Button key={this.props.company + "top2"} className='btn-xs'
                             style={this.getStyle(stats[1].value)}> {stats[1].name} {stats[1].value}</Button>);
      }
      if (stats[2].value > 0) {
        buttons.push(<Button key={this.props.company + "top3"} className='btn-xs'
                             style={this.getStyle(stats[2].value)}> {stats[2].name} {stats[2].value}</Button>);
      }
      statsDiv = (<div style={divStyle}>
        {buttons}
      </div>)
    }

    return (
      <tr>
        <td >
          <div style={titleStyle}>
            <img src={logo} style={style} alt="bank logo" height="42" width="42"/>
            <span style={style}>{str ? str : ""}</span>
            <a href={this.props.link} target="_blank">{this.props.title}</a>
          </div>
          { statsDiv }
        </td>
      </tr>);
  }
}

class JobList extends React.Component {
  render() {
    var rows = [];
    if (this.props.jobs) {
      this.props.jobs.forEach(function (job) {
        rows.push(<JobRow title={job.title} company={job.company}
                          link={job.link} key={job.id} stats={job.stats}
                          post_date={job.post_date}/>);
      });
    }
    var containerStyle = {width: '100%', "margin": "20px auto"};
    return (
      <table style={containerStyle} responsive>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Keyword..."/>
      </form>
    );
  }
}

export class FilterableJobTable extends React.Component {
  render() {
    var currentPage = this.props.currentPage || 1;
    var style = {'text-align': 'center'};
    //<SearchBar />

    return (
      <div>
        <JobList jobs={this.props.jobs}/>
        <div style={style}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            bsSize="small"
            items={this.props.totalPages}
            activePage={currentPage}
            maxButtons={5}
            onSelect={this.props.handleSelect}
          />
        </div>
      </div>
    );
  }
}