import { useTheme } from "../context/ThemeContext";

const TaskItem = ({ task, onDone, onEdit, onDelete }) => {
  const { isDark } = useTheme();

  const ActionButton = ({ onClick, variant, label, icon }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 flex items-center gap-2 whitespace-nowrap";

    const variants = {
      edit: isDark
        ? "bg-info-600 hover:bg-info-700 text-white"
        : "bg-info-100 hover:bg-info-200 text-info-700",
      delete: isDark
        ? "bg-danger-600 hover:bg-danger-700 text-white"
        : "bg-danger-100 hover:bg-danger-200 text-danger-700",
      done: isDark
        ? "bg-success-600 hover:bg-success-700 text-white"
        : "bg-success-100 hover:bg-success-200 text-success-700",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} active:scale-95`}
        title={label}
      >
        {icon} {label}
      </button>
    );
  };

  return (
    <div
      className={`task-item rounded-2xl p-5 mb-4 border-l-4 transition-all duration-300
                   animate-slideInLeft
                   ${isDark
        ? "bg-dark-surface border-l-primary-500 border border-dark-border shadow-dark-card hover:shadow-dark-card-lg"
        : "bg-light-bg border-l-primary-600 border border-light-border shadow-card hover:shadow-card-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Task Content */}
        <div className="flex-1">
          {/* Title */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl flex-shrink-0">{task.emoji || "😊"}</span>
            <h3 className={`text-lg font-bold line-clamp-2
                            ${isDark ? "text-dark-text" : "text-light-text"}`}>
              {task.title}
            </h3>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`text-sm mb-3 ml-16 line-clamp-3
                           ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className={`text-xs ml-16 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
            {task.created_at && (
              <span>
                Created {new Date(task.created_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
          <ActionButton
            onClick={() => onEdit(task)}
            variant="edit"
            label="Edit"
            icon="✏️"
          />
          <ActionButton
            onClick={() => onDelete(task.id)}
            variant="delete"
            label="Delete"
            icon="🗑️"
          />
          <ActionButton
            onClick={() => onDone(task.id)}
            variant="done"
            label="Done"
            icon="✓"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
