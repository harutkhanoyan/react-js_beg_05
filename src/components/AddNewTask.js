import React, { Component } from 'react';


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
    }

    return (
      <div className="divInput" >
        <input
          type="text"
          placeholder="Add task"
          onChange={this.handleChange}
          value={this.state.inputValue}

        />
        <button onClick={handleS} >Add</button>
      </div>
    )
  }
}

export default AddNewTask;