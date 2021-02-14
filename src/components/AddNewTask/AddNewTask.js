import React, { Component } from 'react';
import styles from './AddNewTask.module.css';



class AddNewTask extends Component {
  state = {
    inputValue: ""
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {

    const handleS = () => {
      this.props.handleSubmit(this.state.inputValue);
      this.setState({
        inputValue: ""
      })
    }

    return (
      <div className="divInput" >
        <input
          className={styles.inputAdd}
          type="text"
          placeholder="Add task"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <button 
        className={styles.buttonAdd}
        onClick={handleS}
         >Add</button>
      </div>
    )
  }
}

export default AddNewTask;