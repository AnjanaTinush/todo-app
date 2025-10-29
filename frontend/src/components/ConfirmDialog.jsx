import { useTheme } from "../context/ThemeContext";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", cancelText = "Cancel", type = "danger" }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const confirmButtonColors = {
    danger: isDark ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600",
    warning: isDark ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onCancel}
    >
      <div
        className={`rounded-2xl shadow-lg max-w-sm w-full p-7 transform transition-all animate-slideDown
                     ${isDark ? "bg-dark-surface border border-dark-border" : "bg-light-bg border border-light-border"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-2xl font-bold mb-3 ${isDark ? "text-dark-text" : "text-light-text"}`}>
          {title}
        </h2>
        <p className={`mb-6 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-150 active:scale-95 ${confirmButtonColors[type]}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-150 active:scale-95
                         ${isDark ? "bg-dark-card hover:bg-dark-border text-dark-text" : "bg-light-border hover:bg-light-surface text-light-text"}`}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
