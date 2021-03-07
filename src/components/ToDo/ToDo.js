import React, { Component } from 'react';
import Task from '../Task/Task';
import AddNewTask from '../AddNewTask/AddNewTask';
import idGenerator from '../../helpers/idGenerator';


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
    removeTasks: new Set(),
    isAllChecked: false
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
    let removeTasks = new Set(this.state.removeTasks);
    if (removeTasks.has(_id)) {
      removeTasks.delete(_id)
    } else {
      removeTasks.add(_id);
    }

    this.setState({
      removeTasks
    });
  }

  removeSelcdedTasks = () => {
    let tasks = [...this.state.tasks];
    const { removeTasks } = this.state;
    tasks = tasks.filter(item => !removeTasks.has(item._id));

    this.setState({
      tasks,
      removeTasks: new Set(),
      isAllChecked: false
    });
  }

  handleToggleCHeckAll = () => {
    const { tasks, isAllChecked } = this.state;
    let removeTasks = new Set();
    if (!isAllChecked) {
      removeTasks = new Set(this.state.removeTasks);
      tasks.forEach(task => {
        removeTasks.add(task._id);
      })
    }
    this.setState({
      removeTasks,
      isAllChecked: !isAllChecked
    })
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
            disabled={!!removeTasks.size}
            checked={removeTasks.has(task._id)} />
        </Col>
      )
    })

    return (
      <div>
        <h1>ToDo</h1>
        <AddNewTask
          disabled={!!removeTasks.size}
          handleSubmit={this.handleSubmit} />
        <div >
          <Container className="d-flex flex-column " >
            <Row >
              {Tasks}
            </Row>
            <Row>
              <Col>
                <Button
                  variant='danger'
                  disabled={!!!removeTasks.size} 
                  onClick={this.removeSelcdedTasks}>Remove Selected</Button>
                  <Button 
                  onClick={this.handleToggleCHeckAll}
                  disabled={!!!tasks.length} >
                    {this.state.isAllChecked ? 'Remove All Selected' : 'Select All'}
                  </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }


}

export default ToDo;