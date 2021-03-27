import React, { Component } from "react";
import Task from "../../Task/Task";
import AddTaskModal from "../../TaskActionsModal/TaskActionsModal";
import Confirm from "../../Confirm/Confirm";
import dateFormmatter from "../../../helpers/data";
import { Container, Row, Col, Button } from "react-bootstrap";

class ToDo extends Component {
  state = {
    tasks: [],
    removeTasks: new Set(),
    isAllChecked: false,
    isConfirmModal: false,
    editableTask: null,
    isOpenAddTaskModal: false,
  };

  handleSubmit = (formData) => {
    if (!formData.title || !formData.description) return;
    formData.date = dateFormmatter(formData.date);
    const tasks = [...this.state.tasks];
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        tasks.push(data);
        this.setState({
          tasks,
        });
      })
      .catch((error) => {
        console.log("catch Error", error);
      });
  };

  handleDeleteTask = (_id) => {
    fetch("http://localhost:3001/task/" + _id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((item) => item._id !== _id);

        this.setState({
          tasks,
        });
      })
      .catch((error) => {
        console.log("Delete Task Request Eroror", error);
      });
  };

  toggleSetRemoveTasksId = (_id) => {
    let removeTasks = new Set(this.state.removeTasks);
    if (removeTasks.has(_id)) {
      removeTasks.delete(_id);
    } else {
      removeTasks.add(_id);
    }

    this.setState({
      removeTasks,
    });
  };

  removeSelcdedTasks = () => {
    fetch("http://localhost:3001/task", {
      method: "PATCH",
      body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        let tasks = [...this.state.tasks];
        const { removeTasks } = this.state;
        tasks = tasks.filter((item) => !removeTasks.has(item._id));

        this.setState({
          tasks,
          removeTasks: new Set(),
          isAllChecked: false,
        });
      });
  };

  handleToggleCHeckAll = () => {
    const { tasks, isAllChecked } = this.state;
    let removeTasks = new Set();
    if (!isAllChecked) {
      removeTasks = new Set(this.state.removeTasks);
      tasks.forEach((task) => {
        removeTasks.add(task._id);
      });
    }
    this.setState({
      removeTasks,
      isAllChecked: !isAllChecked,
    });
  };

  handleToggleOpenModal = () => {
    this.setState({
      isConfirmModal: !this.state.isConfirmModal,
    });
  };

  handleSetEditTask = (task) => {
    this.setState({
      editableTask: task,
    });
  };
  setEditableTaskNull = () => {
    this.setState({
      editableTask: null,
    });
  };

  handleEditTask = (editTask) => {
    fetch("http://localhost:3001/task/" + editTask._id, {
      method: "PUT",
      body: JSON.stringify(editTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex((task) => task._id === data._id);
        tasks[idx] = data;
        this.setState({
          tasks,
        });
      })
      .catch((error) => {
        console.error("Edit Task Request", error);
      });
  };

  toggleOpenAddTaskModal = () => {
    this.setState({
      isOpenAddTaskModal: !this.state.isOpenAddTaskModal,
    });
  };

  componentDidMount() {
    fetch("http://localhost:3001/task")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        this.setState({
          tasks: data,
        });
      })
      .catch((error) => {
        console.log("Get Tasks Request Error", error);
      });
  }

  render() {
    const {
      tasks,
      removeTasks,
      isAllChecked,
      isConfirmModal,
      editableTask,
      isOpenAddTaskModal,
    } = this.state;
    const Tasks = this.state.tasks.map((task) => {
      return (
        <Col key={task._id}>
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            toggleSetRemoveTasksId={this.toggleSetRemoveTasksId}
            disabled={!!removeTasks.size}
            checked={removeTasks.has(task._id)}
            handleSetEditTask={this.handleSetEditTask}
          />
        </Col>
      );
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
        <div>
          <Container className="d-flex flex-column ">
            <Row>{Tasks}</Row>
            <Row>
              <Col>
                <Button
                  variant="danger"
                  disabled={!!!removeTasks.size}
                  onClick={this.handleToggleOpenModal}
                >
                  Remove Selected
                </Button>
                <Button
                  onClick={this.handleToggleCHeckAll}
                  disabled={!!!tasks.length}
                >
                  {isAllChecked ? "Remove All Selected" : "Select All"}
                </Button>
              </Col>
            </Row>
          </Container>
          {isConfirmModal && (
            <Confirm
              onHide={this.handleToggleOpenModal}
              onSubmit={this.removeSelcdedTasks}
              massage={`Do you wont to delete ${removeTasks.size} task?`}
            />
          )}
          {editableTask && (
            <AddTaskModal
              editableTask={editableTask}
              onHide={this.setEditableTaskNull}
              onSubmit={this.handleEditTask}
            />
          )}
          {isOpenAddTaskModal && (
            <AddTaskModal
              // onHide={this.toggleOpenAddTaskModal}
              // handleSubmit={this.handleSubmit}
              onHide={this.toggleOpenAddTaskModal}
              onSubmit={this.handleSubmit}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ToDo;
