import styles from './Task.module.css';

function Task({ task, handleDeleteTask, toggleSetRemoveTasksId, disabled }) {
  return (
    <div className={styles.task}>
      <input
        type="checkbox"
        onClick={() => toggleSetRemoveTasksId(task._id)} />
      <p>
        {task.title}
      </p>
      <button
      disabled={disabled} 
      onClick={() => handleDeleteTask(task._id)} >Remove</button>
    </div>
  )
}

export default Task;