import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import dateFormmatter from "../../helpers/data";

class TaskActionsModal extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
      ...props.editableTask,
      date: props.editableTask ? new Date(props.editableTask.date) : new Date(),
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleS = ({ key, type }) => {
    const { title, description } = this.state;
    const { onSubmit, onHide } = this.props;
    if ((type === "keypress" && key !== "Enter") || !title || !description)
      return;

    const formData = { ...this.state };
    formData.date = dateFormmatter(formData.date);
    onSubmit(formData);
    onHide();
  };
  handleSetData = (data) => {
    this.setState({
      data,
    });
  };
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { title, description, data } = this.state;
    const { onHide } = this.props;

    return (
      <Modal
        show={true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Task Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Form.Control
            name="title"
            type="text"
            placeholder="Title"
            onChange={this.handleChange}
            onKeyPress={this.handleS}
            value={title}
            style={{ width: "70%" }}
            ref={this.inputRef}
          />
          <Form.Control
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            className="my-3"
            as="textarea"
            rows={3}
            style={{ width: "70%", resize: "none" }}
            value={description}
          />
          <DatePicker
            selected={data}
            onChange={(date) => this.handleSetData(date)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button
            onClick={this.handleS}
            variant="primary"
            disabled={!!!title || !!!description}
          >
            {this.props.editableTask ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TaskActionsModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  editableTask: PropTypes.object,
};

export default TaskActionsModal;
