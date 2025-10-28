const TaskItem = ({ task, onDone }) => (
  <div className="task-item">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <button onClick={() => onDone(task.id)}>Done</button>
  </div>
);

export default TaskItem;
