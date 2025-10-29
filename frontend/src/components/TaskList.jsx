import { useTheme } from "../context/ThemeContext";
import TaskItem from "./TaskItem";


const TaskList = ({ tasks, onDone, onEdit, onDelete }) => {
  const { isDark } = useTheme();

  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className={`rounded-2xl p-12 text-center border-2 border-dashed transition-all
                       ${isDark
        ? "border-dark-border bg-dark-surface"
        : "border-light-border bg-light-surface"
      }`}
      >
        <div className="text-5xl mb-4">📭</div>
        <p className={`text-xl font-semibold mb-2
                      ${isDark ? "text-dark-text" : "text-light-text"}`}>
          No tasks yet!
        </p>
        <p className={`text-sm
                      ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          Create your first task to get started ✨
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className={`mb-6 pb-4 border-b
                      ${isDark ? "border-dark-border" : "border-light-border"}`}>
        <p className={`text-sm font-semibold
                      ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} to complete
        </p>
      </div>

      {/* Horizontal Scroller - All tasks side by side */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {tasks.map((task) => (
            <div key={task.id} className="flex-shrink-0 w-80">
              <TaskItem
                task={task}
                onDone={onDone}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
