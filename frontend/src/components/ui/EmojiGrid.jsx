import { useTheme } from "../../context/ThemeContext";

const EmojiGrid = ({ emojis, onEmojiSelect, selectedEmoji }) => {
  const { isDark } = useTheme();

  return (
    <div className="grid grid-cols-8 gap-2">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onEmojiSelect(emoji)}
          className={`text-2xl p-2 rounded-lg transition-all duration-150
                       ${selectedEmoji === emoji
            ? isDark
              ? "bg-primary-600 ring-2 ring-primary-400"
              : "bg-primary-100 ring-2 ring-primary-500"
            : isDark
              ? "hover:bg-dark-card"
              : "hover:bg-light-border"
          }`}
          title={emoji}
          aria-label={`Select ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiGrid;
