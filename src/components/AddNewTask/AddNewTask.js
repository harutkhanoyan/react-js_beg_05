import React, { Component } from 'react';
import styles from './AddNewTask.module.css';





class AddNewTask extends Component {
  state = {
    inputValue: ""
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

export default AddNewTask;