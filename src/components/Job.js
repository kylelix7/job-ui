import React from "react";
import td_logo from "../assets/TD.jpg"
import bmo_logo from "../assets/BMO.jpg"
import scotia_logo from "../assets/Scotiabank.jpg"
import rbc_logo from "../assets/RBC.jpg"
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';
import { skills } from '../constants/constants';

export const JOBS = [
  {title: "software developer", company: "TD", id: "TD1"},
  {title: "software engineer", company: "Scotiabank", id: "Scotiabank1"},
  {title: "blockchain develoer", company: "BMO", id: "Bmo1"},
  {title: "UI/UX designer", company: "RBC", id: "RBC1"},
  {title: "project manager", company: "TD", id: "TD2"}
];

class JobRow extends React.Component {
  selectImage(bank) {
    if(bank === "TD") {
      return td_logo;
    } else if(bank === "BMO") {
      return bmo_logo;
    } else if(bank === "Scotiabank") {
      return scotia_logo;
    } else if(bank === "RBC") {
      return rbc_logo;
    } else {
      return "";
    }
  }
  render() {
    var logo = this.selectImage(this.props.company);
    var style = {margin: '10px'};
    return (
      <tr>
        <th>
          <Button className='btn-xs' disabled> Java </Button>
          <img src={logo} style={style} alt="bank logo" height="42" width="42" />
          <a href={this.props.link} target="_blank">{this.props.title}</a>
        </th>
      </tr>);
  }
}

class JobList extends React.Component {
  render() {
    var rows = [];
      if (this.props.jobs) {
      this.props.jobs.forEach(function(job) {
        rows.push(<JobRow title={job.title} company={job.company} link={job.link} key={job.id}/>);
      });
    }
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

class JobFileterTagList extends React.Component {
  render() {
    var all_buttons = skills.map(function(str) {
      var style = {margin: '5px'};
      return <Button key={str} className='btn-xs' style={style}> {str} </Button>;
    });
    return <div> {all_buttons} </div>
  }
}

export class FilterableJobTable extends React.Component {

  render() {
    console.log('render in FilterableJobTable');
    console.log(this.props);
    var currentPage = this.props.currentPage || 1;
    return (
      <div>
        <SearchBar />
        <JobFileterTagList />
        <JobList jobs={this.props.jobs} />
        <Pagination
          bsSize="small"
          items={this.props.totalPages}
          activePage={currentPage}
          onSelect={this.props.handleSelect} />
      </div>
    );
  }
}

