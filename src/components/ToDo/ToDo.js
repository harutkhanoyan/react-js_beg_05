import React, { Component } from 'react';
import Task from '../Task/Task';
import AddNewTask from '../AddNewTask/AddNewTask';
import idGenerator from '../../helpers/idGenerator'

import { Container, Row, Col } from 'react-bootstrap';


class ToDo extends Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: "Task1"
      },
      {
        _id: idGenerator(),
        title: "Task2"
      },
      {
        _id: idGenerator(),
        title: "Task3"
      }
    ],
  }

  handleSubmit = (value) => {
    if (!value) return;
    const tasks = [...this.state.tasks];
    tasks.push({
      _id: idGenerator(),
      title: value
    });
    this.setState({
      tasks
    })
  }

  handleDeleteTask = (id) =>{
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(item => item._id !== id)

    this.setState({
      tasks
    })
  }

  render() {
    const { tasks } = this.state;
    const Tasks = tasks.map(task => {
      return(
        <Col
          key={task._id}
        >
          <Task task={task} handleDeleteTask={this.handleDeleteTask} />
        </Col>
      )
    })

    return (
      <div>
        <h1>ToDo</h1>
        <AddNewTask handleSubmit={this.handleSubmit} />
        <div >
          <Container>
            <Row>
              {Tasks}
            </Row>
          </Container>
        </div>
      </div>
    )
  }


}

export default ToDo;