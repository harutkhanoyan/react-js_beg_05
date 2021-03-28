import React, { Component } from "react";
import styles from "./SingleTask.module.css";
import dateFormmatter from "../../../helpers/data";
import { Button } from "react-bootstrap";
import TaskActionsModal from "../../TaskActionsModal/TaskActionsModal";
import Loader from "../../Loader/Loader";

class SingleTask extends Component {
  state = {
    singleTask: null,
    isEditModal: false,
  };

  toggleEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    });
  };

  handleEditTask = (formData) => {
    fetch("http://localhost:3001/task/" + formData._id, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          singleTask: data,
        });
      })
      .catch((error) => {
        console.log("SIngle Task Page, Edit Task Error", error);
      });
  };

  handleDeleteTask = (id) => {
    fetch(`http://localhost:3001/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Get Single Task Request Error", error);
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`http://localhost:3001/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          singleTask: data,
        });
      })
      .catch((error) => {
        console.error("Get Single Task Request Error", error);
      });
  }
  render() {
    const { singleTask, isEditModal } = this.state;
    if (!singleTask) {
      return (
        <Loader />
      );
    }
    return (
      <div>
        <div className={styles.task}>
          <button className={styles.button} onClick={() => this.props.history.goBack()}>GO Back</button>
          <h2>
            <span style={{ color: "red", fontWeight: "bold" }}>Title:</span>{" "}
            {singleTask.title}
          </h2>
          <p>
            <span style={{ color: "red", fontWeight: "bold" }}>
              Description:
            </span>{" "}
            {singleTask.description}
          </p>
          <p>
            <span style={{ color: "red", fontWeight: "bold" }}>Date:</span>{" "}
            {dateFormmatter(singleTask.date)}
          </p>
          <p>
            <span style={{ color: "red", fontWeight: "bold" }}>
              Created_AT:
            </span>{" "}
            {dateFormmatter(singleTask.created_at)}
          </p>
          <Button
          variant="danger"
          onClick={() => this.handleDeleteTask(singleTask._id)}
        >
          Delete
        </Button>
        <Button
          variant="warning"
          className="ml-2"
          style={{ width: "71.63px" }}
          onClick={this.toggleEditModal}
        >
          Edit
        </Button>
        {isEditModal && (
          <TaskActionsModal
            editableTask={singleTask}
            onHide={this.toggleEditModal}
            onSubmit={this.handleEditTask}
          />
        )}
          
        </div>
        
      </div>
    );
  }
}

export default SingleTask;
