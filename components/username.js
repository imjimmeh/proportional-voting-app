import React, {
  Component
} from 'react'

export default class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', handleChange: props.handleChange  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { 
    this.setState({ value: event.target.value });
    this.props.handleChange(event);
 }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <>
      <label htmlFor="username">Username: </label>
      <input id="username" type="text" value={this.state.value} onChange={this.handleChange} />
      </>
    );
  }
}

