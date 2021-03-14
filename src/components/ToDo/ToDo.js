import React, { Component } from 'react';
import Task from '../Task/Task';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import Confirm from '../Confirm/Confirm';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';
import EditTaskModal from '../EditTaskModal/EditTaskModal';


class ToDo extends Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: "Task1",
        description: "smasdmfasmdf,sasdlmflasdmf"
      },
      {
        _id: idGenerator(),
        title: "Task2",
        description: "smasdmfasmdf,sasdlmflasdmf"

      },
      {
        _id: idGenerator(),
        title: "Task3",
        description: "smasdmfasmdf,sasdlmflasdmf"
      }
    ],
    removeTasks: new Set(),
    isAllChecked: false,
    isConfirmModal: false,
    editableTask: null,
    isOpenAddTaskModal: false
  }

  handleSubmit = (formData) => {
    if (!formData.title || !formData.description) return;
    const tasks = [...this.state.tasks];
    tasks.push({
      _id: idGenerator(),
      title: formData.title,
      description: formData.description
    });
    this.setState({
      tasks
    });
  }

  handleDeleteTask = (id) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(item => item._id !== id)

    this.setState({
      tasks
    });
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

  handleToggleOpenModal = () => {
    this.setState({
      isConfirmModal: !this.state.isConfirmModal
    })
  }

  handleSetEditTask = (task) => {
    this.setState({
      editableTask: task
    })
  }
  setEditableTaskNull = () => {
    this.setState({
        editableTask: null
    });
  }

  handleEditTask = (editTask) => {
    const tasks = [...this.state.tasks];
    const idx = tasks.findIndex(task => task._id === editTask._id);
    tasks[idx] = editTask;
    this.setState({
      tasks
    });
  }

  toggleOpenAddTaskModal = () => {
    this.setState({
      isOpenAddTaskModal: !this.state.isOpenAddTaskModal
    })
  }

  render() {
    const {
      tasks,
      removeTasks,
      isAllChecked,
      isConfirmModal,
      editableTask,
      isOpenAddTaskModal
    } = this.state;
    const Tasks = this.state.tasks.map(task => {
      return (
        <Col
          key={task._id}
        >
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            toggleSetRemoveTasksId={this.toggleSetRemoveTasksId}
            disabled={!!removeTasks.size}
            checked={removeTasks.has(task._id)}
            handleSetEditTask={this.handleSetEditTask}
          />
        </Col>
      )
    });

    return (
      <div>
        <h1>ToDo</h1>
          <Button 
            className="buttonAdd"
            variant="primary"
            onClick={this.toggleOpenAddTaskModal}
          >
            Add Task
          </Button>
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
                  onClick={this.handleToggleOpenModal}
                >
                  Remove Selected
                </Button>
                <Button
                  onClick={this.handleToggleCHeckAll}
                  disabled={!!!tasks.length} >
                  {isAllChecked ? 'Remove All Selected' : 'Select All'}
                </Button>
              </Col>
            </Row>
          </Container>
          {
            isConfirmModal && <Confirm
              onHide={this.handleToggleOpenModal}
              onSubmit={this.removeSelcdedTasks}
              massage={`Do you wont to delete ${removeTasks.size} task?`}
            />
          }
          {
            editableTask && <EditTaskModal
              editableTask={editableTask}
              onHide={this.setEditableTaskNull}
              onSubmit={this.handleEditTask}
            />
          }
          {
            isOpenAddTaskModal && <AddTaskModal
              onHide={this.toggleOpenAddTaskModal}
              handleSubmit={this.handleSubmit}
            />
          }
        </div>
      </div>
    )
  }
}

export default ToDo;