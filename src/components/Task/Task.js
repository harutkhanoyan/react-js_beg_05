import React ,{memo} from 'react';
import styles from './Task.module.css';
import  {Button}  from 'react-bootstrap';
import PropTypes from 'prop-types';

function Task({
  task,
  handleDeleteTask,
  toggleSetRemoveTasksId,
  disabled,
  checked
 }) {
  return (
    <div className={`${styles.task} ${checked && styles.checked}`}>
      <input
        type="checkbox"
        onChange={() => toggleSetRemoveTasksId(task._id)}
        checked={ checked } />
      <p>
        {task.title}
      </p>
      <Button
      variant="danger"
        disabled={disabled}
        onClick={() => handleDeleteTask(task._id)} >Remove</Button>
    </div>
  )
}
Task.propTypes = {
  task: PropTypes.object.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  toggleSetRemoveTasksId: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired
}

export default memo(Task);