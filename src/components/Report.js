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
                  <Cell key={`slice-${index}`} name={entry.name} value={entry.value} fill={colors[index % 10]}/>
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
