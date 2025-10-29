import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import EmojiSelector from "./EmojiSelector";

const EditTaskModal = ({ task, isOpen, onClose, onUpdate }) => {
  const { isDark } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setEmoji(task.emoji || "😊");
    }
  }, [task, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onUpdate({ ...task, title, description, emoji });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        className={`rounded-2xl shadow-lg max-w-md w-full p-7 transform transition-all
                     animate-slideDown
                     ${isDark
          ? "bg-dark-surface border border-dark-border"
          : "bg-light-bg border border-light-border"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold
                          ${isDark ? "text-dark-text" : "text-light-text"}`}>
            ✏️ Edit Task
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all
                        ${isDark
              ? "hover:bg-dark-card text-dark-text"
              : "hover:bg-light-border text-light-text"
            }`}
            title="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Emoji Selector */}
          <div>
            <label className={`block text-sm font-semibold mb-3
                              ${isDark ? "text-dark-text" : "text-light-text"}`}>
              Choose Emoji
            </label>
            <EmojiSelector selectedEmoji={emoji} onEmojiSelect={setEmoji} />
          </div>

          {/* Title Input */}
          <div>
            <label className={`block text-sm font-semibold mb-2
                              ${isDark ? "text-dark-text" : "text-light-text"}`}>
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-150
                           ${isDark
                ? "bg-dark-bg border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary-500"
                : "bg-light-surface border-light-border text-light-text placeholder-light-text-secondary focus:border-primary-500"
              }
                           focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           ${isDark ? "focus:ring-offset-dark-surface" : "focus:ring-offset-light-bg"}`}
            />
          </div>

          {/* Description Input */}
          <div>
            <label className={`block text-sm font-semibold mb-2
                              ${isDark ? "text-dark-text" : "text-light-text"}`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              maxLength={500}
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-150 resize-none
                           ${isDark
                ? "bg-dark-bg border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary-500"
                : "bg-light-surface border-light-border text-light-text placeholder-light-text-secondary focus:border-primary-500"
              }
                           focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           ${isDark ? "focus:ring-offset-dark-surface" : "focus:ring-offset-light-bg"}`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-150
                           ${!title.trim() || isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white shadow-card hover:shadow-card-lg"
              }
                           active:scale-95`}
            >
              {isSubmitting ? "Updating..." : "💾 Update Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-150
                           ${isDark
                ? "bg-dark-card hover:bg-dark-border text-dark-text"
                : "bg-light-border hover:bg-light-surface text-light-text"
              }
                           active:scale-95`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
