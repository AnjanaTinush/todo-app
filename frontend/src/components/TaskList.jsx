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
  const remainingTasks = tasks.slice(3);
  const hasMoreTasks = remainingTasks.length > 0;

  return (
    <div className="task-list flex flex-col h-full">
      <div className={`mb-6 pb-4 border-b
                      ${isDark ? "border-dark-border" : "border-light-border"}`}>
        <p className={`text-sm font-semibold
                      ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} to complete
        </p>
      </div>

      {/* First 3 Cards - Fixed Display */}
      <div className="space-y-3 flex-shrink-0">
        {displayTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDone={onDone}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Scrollable Container for Remaining Cards */}
      {hasMoreTasks && (
        <div className="mt-6 flex-1 overflow-y-auto">
          <div className="space-y-3 pr-2">
            {remainingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDone={onDone}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
