import React, { Component } from 'react';
import styles from './AddNewTask.module.css';

import PropTypes from "prop-types";





class AddNewTask extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef()
    this.state = {
      inputValue: ""
    }
  }
 

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  handleS = ({ key, type }) => {
    if (type === "keypress" && key !== "Enter") return;

    const { inputValue } = this.state;
    const { handleSubmit } = this.props;

    handleSubmit(inputValue);
    this.setState({
      inputValue: ""
    })
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {

    return (
      <div className="divInput" >
        <input
          className={styles.inputAdd}
          type="text"
          placeholder="Add task"
          onChange={this.handleChange}
          value={this.state.inputValue}
          onKeyPress={this.handleS}
          disabled={this.props.disabled}
          ref={this.inputRef}
        />
        <button
          disabled={this.props.disabled}
          className={styles.buttonAdd}
          onClick={this.handleS}
        >Add</button>
      </div>
    )
  }
}

AddNewTask.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default AddNewTask;