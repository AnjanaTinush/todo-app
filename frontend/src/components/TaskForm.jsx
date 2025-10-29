import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import EmojiSelector from "./EmojiSelector";


const TaskForm = ({ onAdd }) => {
  const { isDark } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("😊");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({ title, description, emoji });
      // Reset form
      setTitle("");
      setDescription("");
      setEmoji("😊");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-2xl transition-all duration-300 border
                   ${isDark
        ? "bg-dark-surface border-dark-border shadow-dark-card"
        : "bg-light-bg border-light-border shadow-card"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">✨</span>
        <h2 className={`text-xl font-bold
                        ${isDark ? "text-dark-text" : "text-light-text"}`}>
          Create New Task
        </h2>
      </div>

      {/* Emoji Selector */}
      <div className="mb-6">
        <label className={`text-sm font-semibold mb-3 flex items-center gap-2
                          ${isDark ? "text-dark-text" : "text-light-text"}`}>
          <span>🎨</span> Choose Emoji
        </label>
        <EmojiSelector selectedEmoji={emoji} onEmojiSelect={setEmoji} />
      </div>

      {/* Title Input */}
      <div className="mb-5">
        <label className={`text-sm font-semibold mb-2 flex items-center gap-2
                          ${isDark ? "text-dark-text" : "text-light-text"}`}>
          <span>📝</span> Task Title
        </label>
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className={`w-full px-4 py-3 rounded-xl transition-all duration-200
                       border-2 outline-none
                       ${isDark
            ? "bg-dark-bg border-dark-border text-dark-text placeholder-dark-text-secondary hover:border-primary-500 focus:border-primary-500"
            : "bg-light-surface border-light-border text-light-text placeholder-light-text-secondary hover:border-primary-500 focus:border-primary-500"
          }
                       focus:ring-2 focus:ring-primary-400 focus:ring-offset-1
                       ${isDark ? "focus:ring-offset-dark-surface" : "focus:ring-offset-light-bg"}`}
        />
        <p className={`text-xs mt-2 transition-colors duration-300 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          {title.length}/100 characters
        </p>
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label className={`text-sm font-semibold mb-2 flex items-center gap-2
                          ${isDark ? "text-dark-text" : "text-light-text"}`}>
          <span>📋</span> Description
        </label>
        <textarea
          placeholder="Add more details about your task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          maxLength={500}
          className={`w-full px-4 py-3 rounded-xl transition-all duration-200
                       border-2 outline-none resize-none
                       ${isDark
            ? "bg-dark-bg border-dark-border text-dark-text placeholder-dark-text-secondary hover:border-primary-500 focus:border-primary-500"
            : "bg-light-surface border-light-border text-light-text placeholder-light-text-secondary hover:border-primary-500 focus:border-primary-500"
          }
                       focus:ring-2 focus:ring-primary-400 focus:ring-offset-1
                       ${isDark ? "focus:ring-offset-dark-surface" : "focus:ring-offset-light-bg"}`}
        />
        <p className={`text-xs mt-2 transition-colors duration-300 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
          {description.length}/500 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200
                     ${isFormValid && !isSubmitting
          ? "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-card hover:shadow-card-lg"
          : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        }
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     ${isDark ? "focus:ring-offset-dark-surface" : "focus:ring-offset-light-bg"} flex items-center justify-center gap-2`}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin">⚙️</span> Creating...
          </>
        ) : (
          <>
            <span>➕</span> Create Task
          </>
        )}
      </button>
    </form>
  );
};

export default TaskForm;
