import styles from './Task.module.css';

function Task({ task, handleDeleteTask }) {
  return (
    <div className={styles.task}>
          <p>
            {task.title}
          </p>
          <button onClick={() => handleDeleteTask(task._id)} >Remove</button>
        </div>
  )
}
                                              
export default Task;