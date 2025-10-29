import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import EmojiGrid from "./ui/EmojiGrid";

// Constants (Separation of Concerns)
const EMOJI_LIST = [
  "📝", "✅", "❌", "⚠️", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣",
  "💼", "🎯", "🚀", "⭐", "💡", "🎨", "📚", "🎬", "🎵", "🎮",
  "🏃", "🧘", "💪", "🤔", "😊", "👍", "🙌", "🎉", "🎁", "🌟",
  "⏰", "📅", "📊", "📈", "💻", "📱", "🔧", "🔐", "🌍", "❤️"
];


const EmojiSelector = ({ selectedEmoji, onEmojiSelect }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                     font-semibold text-2xl transition-all duration-150
                     ${isDark
          ? "bg-dark-surface border border-dark-border hover:bg-dark-card"
          : "bg-light-surface border border-light-border hover:bg-light-border"
        }
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     ${isDark ? "focus:ring-offset-dark-bg" : "focus:ring-offset-light-bg"}`}
      >
        {selectedEmoji || "😊"}
        <span className="text-xs text-gray-500 dark:text-dark-text-secondary">▼</span>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 p-4 rounded-xl z-50
                        shadow-lg ${isDark ? "shadow-dark-card-lg" : ""}
                        ${isDark
          ? "bg-dark-surface border border-dark-border"
          : "bg-light-surface border border-light-border"
        }
                        animate-slideDown w-96`}
        >
          <EmojiGrid
            emojis={EMOJI_LIST}
            onEmojiSelect={handleEmojiSelect}
            selectedEmoji={selectedEmoji}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
