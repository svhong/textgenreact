import React, { Component } from "react";
import "./App.css";
import Output from "./components/output";
import Selectmeat from "./components/selectmeat";
import Selectamount from "./components/selectamount";
import Selectsentence from "./components/sentence";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "1",
      meat: "all-meat",
      paras: "paras",
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
          "&" +
          this.state.paras +
          "=" +
          this.state.amount +
          "&start-with-lorem=1"
      )
      .then(res => {
        this.setState({ text: res.data });
      });
  }
  //getSampleText parameter updates request
  showHtml(x) {
    this.setState({ meat: x }, this.getSampleText);
  }
  changeAmount(number) {
    this.setState({ amount: number }, this.getSampleText);
  }

  changeSentence(x) {
    this.setState({ paras: x }, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <h1 className="titleText">ReactJS Bacon Ipsum Generator</h1>
        <hr />
        <form className="form userSelect">
          <div className="form-group">
            <label>Pick A Protein</label>
            <Selectmeat
              value={this.state.meat}
              onChange={this.showHtml.bind(this)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>How Many Pounds?</label>
            <Selectamount
              value={this.state.amount}
              onChange={this.changeAmount.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Prepped?</label>
            <Selectsentence
              value={this.state.amount}
              onChange={this.changeSentence.bind(this)}
            />
          </div>
        </form>
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
