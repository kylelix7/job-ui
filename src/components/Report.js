import React from "react";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import {scaleOrdinal, schemeCategory10} from "d3-scale";

export class JobPieChart extends React.Component {
  render() {
    if (this.props.top10) {
      const colors = scaleOrdinal(schemeCategory10).range();
      const top10Skills = this.props.top10;
      return (
        <div className="pie-chart-wrapper">
          <PieChart width={800} height={400}>
            <Legend />
            <Tooltip />
            <Pie cx={200} cy={200} outerRadius={80} label>
              {
                top10Skills.map((entry, index) => (
                  <Cell key={`slice-${index}`} name={entry.name} value={entry.value}
                        fill={colors[index % 10]}/>
                ))
              }
            </Pie>
          </PieChart>
        </div>
      );
    } else {
      return <p>No data to be shown.</p>;
    }
  }
}
