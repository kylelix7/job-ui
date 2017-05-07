import React from "react";
import td_logo from "../assets/TD.jpg"
import bmo_logo from "../assets/BMO.jpg"
import scotia_logo from "../assets/Scotiabank.jpg"
import rbc_logo from "../assets/RBC.jpg"
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';
import Pager from 'react-bootstrap/lib/Pager';
import { skills } from '../constants/constants';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

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

class JobPieChart extends React.Component {
  render() {
    const colors = scaleOrdinal(schemeCategory10).range();
      const data01 = [
        { name: 'Group A', value: 900, v: 89 },
        { name: 'Group B', value: 300, v: 100 },
        { name: 'Group C', value: null, v: 200 },
        { name: 'Group D', value: 200, v: 20 },
        { name: 'Group E', value: 278, v: 40 },
        { name: 'Group F', value: 189, v: 60 },
      ];
      
      const data02 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
      ];
      
      const data03 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 30 },
        { name: 'B5', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
        { name: 'E1', value: 200 },
        { name: 'E2', value: 34 },
        { name: 'E3', value: 44 },
        { name: 'F1', value: 89 },
        { name: 'F2', value: 49 },
        { name: 'F3', value: 51 },
      ];

    return (
        <div className="pie-chart-wrapper">
          <PieChart width={800} height={400}>
            <Legend />
            <Tooltip />
            <Pie cx={200} cy={200} outerRadius={80} label>
              {
                data01.map((entry, index) => (
                  <Cell key={`slice-${index}`} name={entry.name} value={entry.value} fill={colors[index % 10]}/>
                ))
              }
            </Pie>
            <Pie cx={600} cy={200} startAngle={180} endAngle={-180} innerRadius={60} outerRadius={80}
              label>
              {
                data02.map((entry, index) => (
                  <Cell key={`slice-${index}`} name={entry.name} value={entry.value} fill={colors[index % 10]}/>
                ))
              }
            </Pie>
          </PieChart>
        </div>

    );
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
        <Pager>
          <Pager.Item href="#">Previous</Pager.Item>
          <Pager.Item href="#">Next</Pager.Item>
        </Pager>
      </div>
    );
  }
}

