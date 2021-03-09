import React, { Component } from 'react';
import styles from './AddNewTask.module.css';

import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
class AddNewTask extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef()
    this.state = {
      title: "",
      description: ""
    }
  }
 

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleS = ({ key, type }) => {
    if (type === "keypress" && key !== "Enter") return;

    const { title, description } = this.state;
    const { handleSubmit } = this.props;
    const formData = {
      title,
      description
    };

    handleSubmit(formData);
    this.setState({
      title: "",
      description: ""
    });
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { title, description } = this.state;
    const { disabled } = this.props;

    return (
      <div className="divInput" >
        <Form.Control
          className={styles.inputAdd}
          type="text"
          placeholder="Title"
          onChange={this.handleChange}
          value={title}
          onKeyPress={this.handleS}
          disabled={disabled}
          ref={this.inputRef}
          style={{width: "50%",marginLeft: "25%"}}
          name="title"
        />
        <Form.Control
        placeholder="Description"
        onChange={this.handleChange}
        as="textarea"
        rows={3}
        style={{width: "50%",marginLeft: "25%", resize: "none"}}
        name="description"
        value={description}
        />
        <button
          disabled={!(!!title && !!description)}
          className={styles.buttonAdd}
          onClick={this.handleS}
        >
          Add
        </button>
      </div>
    )
  }
}

AddNewTask.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default AddNewTask;