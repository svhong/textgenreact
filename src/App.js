import React, { Component } from "react";
import "./App.css";
import Output from "./components/output";
import Selectmeat from "./components/selectmeat";
import Selectamount from "./components/selectamount";
import Selectsentence from "./components/sentence";
import Ham from "./img/ham.png";

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getSampleText();
  }

  getSampleText() {
    fetch(
      "https://baconipsum.com/api/?type=" +
      this.state.meat +
      "&" +
      this.state.paras + 
      "=" +
      this.state.amount +
      "&start-with-lorem=1"
    )
      .then(res => res.json())
      .then(data => this.setState({
        text: data
      }))

  }
  //getSampleText parameter updates request
  showHtml(x) {
    this.setState({ meat: x });
  }
  changeAmount(number) {
    this.setState({ amount: number });
  }

  changeSentence(x) {
    this.setState({ paras: x });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getSampleText();
  }

  render() {
    return (
      <div className="App container">
        <h1 className="titleText">
          {" "}
          <img src={Ham} alt="ham..." /> ReactJS Bacon Ipsum Generator
          <img src={Ham} alt="ham..." />
        </h1>
        <hr />
        <form className="form userSelect" onSubmit={this.handleSubmit}>
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
              value={this.state.paras}
              onChange={this.changeSentence.bind(this)}
            />
          </div>
          <button>Chop it up!</button>
        </form>
        <br />
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
