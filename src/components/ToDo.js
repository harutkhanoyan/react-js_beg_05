import React, { Component } from 'react';
import Task from "./Task";


class ToDo extends Component {
  state = {
    tasks: ["task1", "task2", "task3"]
  }

  render() {
    const Tasks = this.state.tasks.map((task) => {
      return (
         <Task task={task} />
      )
    })

    return (
      <div>
        <h1>ToDo</h1>
        <div className="divInput" >
          <input type="text"placeholder="Add task"></input>
          <button>Add</button>
        </div>
        <div className="container">
          {Tasks}
        </div>
      </div>
    )
  }


}

export default ToDo;