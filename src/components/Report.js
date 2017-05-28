import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import {scaleOrdinal, schemeCategory10} from "d3-scale";

export class JobChart extends React.Component {
  constructor(props) {
    super(props);
    this.findTop = this.findTop.bind(this);
  }

  findTop(stats, limit) {
    if (!limit) {
      limit = 10;
    }
    if (!stats || !Array.isArray(stats)) {
      return null;
    }
    stats.sort(function (a, b) {
      if (a.value < b.value)
        return 1;
      if (a.value > b.value)
        return -1;
      return 0;
    });
    var top = stats.slice(0, limit);
    top = top.map((entry, value) => ({name: entry.name.replace(/-/g, '.'), value: entry.value}))
    return top;
  }

  renderCustomizedLabel({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render() {
    var top10 = this.findTop(this.props.stats);
    var top20 = this.findTop(this.props.stats, 20);
    if (top10) {
      const colors = scaleOrdinal(schemeCategory10).range();
      var style = {
        "margin": "auto",
        "width": "50%",
        "padding": "40px 40px 40px 40px"
      };
      var margin = {
        "margin": "40px 40px 40px 40px"
      };
      return (
        <div>
          <div style={margin}>
            <DropdownButton title="Banks" id="bg-nested-dropdown">
              <MenuItem eventKey="All" onSelect={this.props.onSelectorClick}>All</MenuItem>
              <MenuItem eventKey="RBC" onSelect={this.props.onSelectorClick}>RBC</MenuItem>
              <MenuItem eventKey="TD" onSelect={this.props.onSelectorClick}>TD</MenuItem>
              <MenuItem eventKey="Scotiabank" onSelect={this.props.onSelectorClick}>Scotiabank</MenuItem>
              <MenuItem eventKey="BMO" onSelect={this.props.onSelectorClick}>BMO</MenuItem>
            </DropdownButton>
          </div>
          <h4 style={style}>{this.props.company} - Top 10 skills</h4>
          <ResponsiveContainer width='80%' aspect={16.0 / 9.0}>
            <PieChart width={800} height={400}>
              <Legend/>
              <Tooltip />
              <Pie label legendType="line" paddingAngle={5}>
                {
                  top10.map((entry, index) => (
                    <Cell key={`slice-${index}`} name={entry.name} value={entry.value}
                          fill={colors[index % 10]}/>
                  ))
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>


          <h4 style={style}>{this.props.company} - Top 20 skills</h4>
          <ResponsiveContainer width='80%' aspect={16.0 / 9.0}>
            <BarChart data={top20}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey="value" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else {
      return <div><h4 style={style}>{this.props.company} Top 10 skills</h4> <p>No data</p></div>;
    }
  }
}
