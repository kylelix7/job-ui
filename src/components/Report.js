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
import {skills} from "../constants/constants";
import Button from "react-bootstrap/lib/Button";

export class JobChart extends React.Component {

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
    top = top.map((entry, value) => ({name: entry.name.replace(/-/g, '.'), value: entry.value}));
    return top;
  }

  findTopItemsFromBank(itemsInBank, topItemsOverall) {
    var arr = [];
    if(itemsInBank && topItemsOverall) {
      topItemsOverall.forEach(function(item){
        var name = item.name.replace(/\./g, '-');
        var i = itemsInBank.find(x => x.name === name);
        arr.push(i);
      });
      return arr;
    } else {
      return [];
    }
  }

  aggregate(top20, skillsInRBC, skillsInTD, skillsInScotia, skillsInBMO) {
    var arr = [];
    if(top20 && skillsInRBC && skillsInTD && skillsInScotia && skillsInBMO
      && skillsInRBC.length === 20 && skillsInTD.length === 20 && skillsInScotia.length === 20 && skillsInBMO.length === 20) {

      for (var i = 0; i < top20.length; i++) {
        var item = top20[i];
        var showName = item.name;
        var name = showName.replace(/\./g, '-');

        var sRBC = skillsInRBC.find(x=> x && x.name===name);
        var sRBCv = 0;
        if(sRBC) {sRBCv = sRBC.value;}
        var sTD = skillsInTD.find(x=> x && x.name===name);
        var sTDv = 0;
        if(sTD) {
          sTDv = sTD.value;
        }
        var sScotia= skillsInScotia.find(x=> x && x.name===name);
        var sScotiav = 0;
        if(sScotia) {
          sScotiav = sScotia.value;
        }
        var sBMO= skillsInBMO.find(x=> x && x.name===name);
        var sBMOv = 0;
        if(sBMO) {
          sBMOv = sBMO.value;
        }
        var record = {name: showName, RBC: sRBCv, TD: sTDv, Scotiabank: sScotiav, BMO: sBMOv};
        arr.push(record);
      }
      return arr;
    }
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

    var adStyle = {"border" : "none"};
    var topRBC = this.findTopItemsFromBank(this.props.rbc_stats, top20);
    var topTD = this.findTopItemsFromBank(this.props.td_stats, top20);
    var topScotia = this.findTopItemsFromBank(this.props.scotiabank_stats, top20);
    var topBMO = this.findTopItemsFromBank(this.props.bmo_stats, top20);
    var aggregated = this.aggregate(top20, topRBC, topTD, topScotia, topBMO);

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
            <DropdownButton title="Banks" id="bg-nested-dropdown" >
              <MenuItem eventKey="All" onSelect={this.props.onSelectorClick}>All</MenuItem>
              <MenuItem eventKey="RBC" onSelect={this.props.onSelectorClick}>RBC</MenuItem>
              <MenuItem eventKey="TD" onSelect={this.props.onSelectorClick}>TD</MenuItem>
              <MenuItem eventKey="Scotiabank" onSelect={this.props.onSelectorClick}>Scotiabank</MenuItem>
              <MenuItem eventKey="BMO" onSelect={this.props.onSelectorClick}>BMO</MenuItem>
            </DropdownButton>
          </div>
          <h4 style={style}> Top 10 skills - {this.props.company} - {this.props.jobCount} Jobs</h4>
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

        <br/>
          
          <h4 style={style}>Top 20 skills </h4>
          <ResponsiveContainer width='80%' aspect={16.0 / 9.0}>
            <BarChart data={aggregated}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey="RBC" stackId="a" fill="#00bfff" />
              <Bar dataKey="TD" stackId="a" fill="#007701" />
              <Bar dataKey="Scotiabank" stackId="a" fill="#d81e05" />
              <Bar dataKey="BMO" stackId="a" fill="#6a5acd" />
            </BarChart>
          </ResponsiveContainer>
          {/*<JobFileterTagList />*/}
          <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=41a39bd8-d6a8-4b74-be95-54275b73fc94"></script>
        </div>
      );
    } else {
      return <div><h4 style={style}>{this.props.company} Top 10 skills</h4> <p>No data</p></div>;
    }
  }
}


class JobFileterTagList extends React.Component {
  render() {
    var all_buttons = skills.map(function (str) {
      var style = {margin: '5px'};
      return <Button key={str} className='btn-xs' style={style}> {str} </Button>;
    });
    return <div> {all_buttons} </div>
  }
}