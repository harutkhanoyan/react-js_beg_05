import React, { Component } from 'react';
import Task from '../Task/Task';
import AddNewTask from '../AddNewTask/AddNewTask';


class ToDo extends Component {
  state = {
    tasks: ["task1", "task2", "task3"],
  }
  
  handleSubmit = (value) => {
    if(!value) return;
    const tasks = [...this.state.tasks];
    tasks.push(value);
    this.setState({
      tasks
    })
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