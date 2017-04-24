import React from "react";

export default class JobMaster extends React.Component {
  constructor() {
    super();
    this.name = "Kyle";
  }
  render() {
    return (<h1>It's {this.name}!</h1>);
  }
}
