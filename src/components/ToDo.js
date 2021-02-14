import React, { Component } from 'react';
import Task from './Task';
import AddNewTask from './AddNewTask';


class ToDo extends Component {
  state = {
    tasks: ["task1", "task2", "task3"],
  }
  
  handleSubmit = (value) => {
    console.log("value", value);
  }

  render() {
    const Tasks = this.state.tasks.map((task, index) => {
      return (
         <Task task={task} key={index} />
      )
    })

    return (
      <div>
        <h1>ToDo</h1>
        <AddNewTask handleSubmit={this.handleSubmit} />
        <div className="container">
          {Tasks}
        </div>
      </div>
    )
  }


}

export default ToDo;