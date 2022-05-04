import React, {
  Component
} from 'react'

export default class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value, handleChange: props.handleChange };
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
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" value={this.state.value} onChange={this.handleChange} />
      </>
    );
  }
}

