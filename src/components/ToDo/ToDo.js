import React, { Component } from 'react';
import Task from '../Task/Task';
import AddNewTask from '../AddNewTask/AddNewTask';
import idGenerator from '../../helpers/idGenerator'

import { Container, Row, Col, Button } from 'react-bootstrap';


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
    removeTasks: []
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

  handleDeleteTask = (id) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(item => item._id !== id)

    this.setState({
      tasks
    })
  }

  toggleSetRemoveTasksId = (_id) => {
    let removeTasks = [...this.state.removeTasks];
    if (removeTasks.includes(_id)) {
      removeTasks = removeTasks.filter(id => id !== _id);
    } else {
      removeTasks.push(_id);
    }

    this.setState({
      removeTasks
    });
  }

  removeSelcdedTasks = () => {
    let tasks = [...this.state.tasks];
    const removeTasks = [...this.state.removeTasks];
    tasks = tasks.filter(item => !removeTasks.includes(item._id));

    this.setState({
      tasks,
      removeTasks: []
    });
  }

  render() {
    const { tasks, removeTasks } = this.state;
    const Tasks = tasks.map(task => {
      return (
        <Col
          key={task._id}
        >
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            toggleSetRemoveTasksId={this.toggleSetRemoveTasksId}
            disabled={!!removeTasks.length}
            checked={removeTasks.includes(task._id)} />
        </Col>
      )
    })

    return (
      <div>
        <h1>ToDo</h1>
        <AddNewTask
          disabled={!!removeTasks.length}
          handleSubmit={this.handleSubmit} />
        <div >
          <Container className="d-flex flex-wrap-wrap ">
            <Row>
              {Tasks}
            </Row>
            <Row>
              <Col>
                <Button
                  variant='danger'
                  disabled={!!!removeTasks.length} 
                  onClick={this.removeSelcdedTasks}>Remove Selecded</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }


}

export default ToDo;