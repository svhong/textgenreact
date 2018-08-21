import React, { Component } from "react";

class Selectsentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  onChange(e) {
    this.setState({ value: e.target.value }, function() {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    return (
      <div>
        <select className="form-control" onChange={this.onChange.bind(this)}>
          <option value="paras">Chunks</option>
          <option value="sentences">Bits-n-Pieces</option>
        </select>
      </div>
    );
  }
}

export default Selectsentence;
