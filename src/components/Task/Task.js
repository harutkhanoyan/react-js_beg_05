import React, { memo } from 'react';
import styles from './Task.module.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function Task({
  task,
  handleDeleteTask,
  toggleSetRemoveTasksId,
  disabled,
  checked,
  handleSetEditTask
}) {
  return (
    <div className={`${styles.task} ${checked && styles.checked}`}>
      <input
        type="checkbox"
        onChange={() => toggleSetRemoveTasksId(task._id)}
        checked={checked} />
      <p>
        <span style={{color: "red",fontWeight:"bold"}}>Title:</span> {task.title}
      </p>
      <p>
        <span style={{color: "red",fontWeight:"bold"}} >Description:</span> {task.description}
      </p>
      <Button
        variant="danger"
        disabled={disabled}
        onClick={() => handleDeleteTask(task._id)} >
           <FontAwesomeIcon icon={faTrash} />
        </Button>
      <Button
        variant="warning"
        className="ml-3"
        disabled={disabled}
        onClick={() => handleSetEditTask(task)}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </div>
  )
}
Task.propTypes = {
  task: PropTypes.object.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  toggleSetRemoveTasksId: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  handleSetEditTask: PropTypes.func.isRequired
}

export default memo(Task);