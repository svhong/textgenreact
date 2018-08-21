import React, { Component } from "react";
import "./App.css";
import Output from "./components/output";
import Selectmeat from "./components/selectmeat";
import Selectamount from "./components/selectamount";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "1",
      meat: "all-meat",
      paras: "",
      lorem: true,
      text: ""
    };
  }
  componentWillMount() {
    this.getSampleText();
  }

  getSampleText() {
    axios
      .get(
        "https://baconipsum.com/api/?type=" +
          this.state.meat +
          "&paras=" +
          this.state.amount +
          "&start-with-lorem=1"
      )
      .then(res => {
        this.setState({ text: res.data }, function() {
          console.log(this.state.amount);
        });
      });
  }
  //getSampleText parameter updates request
  showHtml(x) {
    this.setState({ meat: x }, this.getSampleText);
  }
  changeParas(number) {
    this.setState({ amount: number }, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <h1>ReactJS sample text generator</h1>
        <hr />
        <form className="form-inline">
          <div className="form-group">
            <label>Meat Type?</label>
            <Selectmeat
              value={this.state.meat}
              onChange={this.showHtml.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Pounds?</label>
            <Selectamount
              value={this.state.amount}
              onChange={this.changeParas.bind(this)}
            />
          </div>
        </form>
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
