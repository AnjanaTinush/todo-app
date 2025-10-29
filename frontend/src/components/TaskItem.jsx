import { useTheme } from "../context/ThemeContext";

const TaskItem = ({ task, onDone, onEdit, onDelete }) => {
  const { isDark } = useTheme();

  const ActionButton = ({ onClick, variant, label, icon }) => {
    const baseClasses = "px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap active:scale-95 hover:scale-105";

    const variants = {
      edit: isDark
        ? "bg-info-600 hover:bg-info-700 text-white shadow-sm hover:shadow-md"
        : "bg-info-50 hover:bg-info-100 text-info-700 border border-info-200 shadow-sm",
      delete: isDark
        ? "bg-danger-600 hover:bg-danger-700 text-white shadow-sm hover:shadow-md"
        : "bg-danger-50 hover:bg-danger-100 text-danger-700 border border-danger-200 shadow-sm",
      done: isDark
        ? "bg-success-600 hover:bg-success-700 text-white shadow-sm hover:shadow-md"
        : "bg-success-50 hover:bg-success-100 text-success-700 border border-success-200 shadow-sm",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
        title={label}
      >
        {icon} <span className="hidden sm:inline">{label}</span>
      </button>
    );
  };

  return (
    <div
      className={`task-item rounded-2xl p-4 sm:p-6 mb-4 border-l-4 transition-all duration-300
                   animate-slideInLeft
                   ${isDark
        ? "bg-dark-surface border-l-primary-500 border border-dark-border shadow-dark-card hover:shadow-dark-card-lg"
        : "bg-light-bg border-l-primary-600 border border-light-border shadow-card hover:shadow-card-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`flex-shrink-0 p-2.5 rounded-xl text-3xl transition-all duration-300
              ${isDark ? "bg-dark-card" : "bg-light-surface"}`}>
              {task.emoji || "😊"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-bold line-clamp-2 transition-colors duration-300
                              ${isDark ? "text-dark-text" : "text-light-text"}`}>
                {task.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`text-sm mb-3 px-1 line-clamp-3 transition-colors duration-300
                           ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className={`text-xs px-1 transition-colors duration-300 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
            {task.created_at && (
              <span>
                📅 {new Date(task.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: new Date(task.created_at).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                })}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
          <ActionButton
            onClick={() => onEdit?.(task)}
            variant="edit"
            label="Edit"
            icon="✏️"
          />
          <ActionButton
            onClick={() => onDelete?.(task.id)}
            variant="delete"
            label="Delete"
            icon="🗑️"
          />
          <ActionButton
            onClick={() => onDone?.(task.id)}
            variant="done"
            label="Done"
            icon="✅"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
