import React, { Component } from "react";
import styles from "./SingleTask.module.css";
import dateFormmatter from "../../../helpers/data";
import { Button } from "react-bootstrap";

class SingleTask extends Component {
  state = {
    singleTask: null,
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
  handleHistoryTest = () => {
    const { history } = this.props;
    history.go(0);
  }
  render() {
    const { singleTask } = this.state;
    if (!singleTask) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    return (
      <div className={styles.task}>
        <div>
          <button onClick={this.handleHistoryTest}>
            History Test
          </button>
        </div>
        <div>
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
        </div>
        <Button
          variant="danger"
        >
          Delete
        </Button>
        <Button
          variant="warning"
          className="ml-2"
          style={{ width: "71.63px"}}
        >
          Edit
        </Button>
      </div>
    );
  }
}

export default SingleTask;
