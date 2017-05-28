import React from "react";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import {scaleOrdinal, schemeCategory10} from "d3-scale";

export class JobPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.findTop10 = this.findTop10.bind(this);
  }

  findTop10(stats) {
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
    var top10 = stats.slice(0, 10);
    return top10;
  }

  renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  render() {
    var top10 = this.findTop10(this.props.stats);
    if (top10) {
      const colors = scaleOrdinal(schemeCategory10).range();
      var style = {
        "margin": "auto",
        "width": "50%",
        "padding": "10px"
      };
      return (
        <div className="pie-chart-wrapper">
          <h4 style={style}>{this.props.company} - Top 10 skills</h4>
          <PieChart style={style} width={800} height={400}>
            <Legend/>
            <Tooltip />
            <Pie cx={200} cy={200} outerRadius={80} innerRadius={40} label legendType="line">
              {
                top10.map((entry, index) => (
                  <Cell key={`slice-${index}`} name={entry.name} value={entry.value}
                        fill={colors[index % 10]}/>
                ))
              }
            </Pie>
          </PieChart>
        </div>
      );
    } else {
      return <div><h4 style={style}>{this.props.company} Top 10 skills</h4> <p>No data</p></div>;
    }
  }
}
