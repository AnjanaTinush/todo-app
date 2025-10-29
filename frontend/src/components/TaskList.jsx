import { useTheme } from "../context/ThemeContext";
import TaskItem from "./TaskItem";


const TaskList = ({ tasks, onDone, onEdit, onDelete }) => {
  const { isDark } = useTheme();

  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className={`rounded-2xl p-8 sm:p-12 text-center border-2 border-dashed transition-all
                       ${isDark
        ? "border-dark-border bg-dark-surface"
        : "border-light-border bg-light-surface"
      }`}
      >
        <div className="text-6xl mb-4 animate-slideUp">📭</div>
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
      {/* Header with Task Count */}
      <div className={`mb-6 pb-4 border-b transition-colors duration-300
                      ${isDark ? "border-dark-border" : "border-light-border"}`}>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-semibold
                        ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
            📋 {tasks.length} task{tasks.length !== 1 ? "s" : ""} to complete
          </p>
          {hasMoreTasks && (
            <span className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300
              ${isDark
                ? "bg-primary-900 text-primary-200"
                : "bg-primary-100 text-primary-700"}`}>
              +{tasks.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Scrollable Task Container */}
      <div className={`relative ${hasMoreTasks ? "overflow-x-auto overflow-y-hidden" : ""}`}>
        {/* Gradient Fade Effect for Scrollable Content */}
        {hasMoreTasks && (
          <div className={`absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10 transition-colors duration-300
            ${isDark
              ? "bg-gradient-to-l from-dark-surface via-dark-surface to-transparent"
              : "bg-gradient-to-l from-light-bg via-light-bg to-transparent"}`}
          />
        )}

        <div className={`flex flex-col ${hasMoreTasks ? "max-w-none" : "max-w-full"}`}>
          {displayTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDone={onDone}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {/* Show All Button / More Tasks Indicator */}
          {hasMoreTasks && (
            <div className={`p-4 sm:p-6 rounded-2xl border-2 border-dashed transition-all duration-300 flex items-center justify-center min-h-[120px]
              ${isDark
              ? "border-dark-border bg-dark-card hover:bg-dark-surface"
              : "border-light-border bg-light-surface hover:bg-light-hover"
            }`}>
              <div className="text-center">
                <p className={`text-sm font-semibold mb-1
                  ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
                  Scroll right →
                </p>
                <p className={`text-xs
                  ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
                  {tasks.length - 3} more task{tasks.length - 3 !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full List View Below Scroller on Mobile */}
      {hasMoreTasks && (
        <details className="mt-8 transition-all duration-300">
          <summary className={`cursor-pointer text-sm font-semibold p-3 rounded-lg transition-colors duration-300
            ${isDark
            ? "hover:bg-dark-card text-dark-text-secondary"
            : "hover:bg-light-surface text-light-text-secondary"
          }`}>
            📄 View all {tasks.length} tasks
          </summary>
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
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
