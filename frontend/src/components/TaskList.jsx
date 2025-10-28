import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDone }) => (
  <div className="task-list">
    {tasks.length === 0 ? (
      <p>No tasks available</p>
    ) : (
      tasks.map((task) => <TaskItem key={task.id} task={task} onDone={onDone} />)
    )}
  </div>
);

export default TaskList;
