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

  const displayTasks = tasks.slice(0, 3);
  const hasMoreTasks = tasks.length > 3;

  return (
    <div className="task-list">
      <div className={`mb-4 pb-4 border-b
                      ${isDark ? "border-dark-border" : "border-light-border"}`}>
        <p className={`text-sm font-semibold
                      ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} to complete
        </p>
      </div>

      {/* Horizontal Scroller for first 3 cards */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-light-border dark:scrollbar-thumb-dark-border scrollbar-track-transparent">
        <div className="flex gap-2 pb-2 min-w-max">
          {displayTasks.map((task) => (
            <div key={task.id} className="flex-shrink-0 w-96">
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

      {/* Show all remaining tasks in expanded view */}
      {hasMoreTasks && (
        <details className="mt-6">
          <summary className={`cursor-pointer text-sm font-semibold p-3 rounded-lg transition-colors
                              ${isDark ? "hover:bg-dark-surface text-dark-text-secondary" : "hover:bg-light-surface text-light-text-secondary"}`}>
            View all {tasks.length} tasks
          </summary>
          <div className="mt-4 space-y-2">
            {tasks.slice(3).map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDone={onDone}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default TaskList;
