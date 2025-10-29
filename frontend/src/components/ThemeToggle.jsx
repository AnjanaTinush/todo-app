import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-40 p-2.5 rounded-full
                 bg-light-surface dark:bg-dark-surface
                 border border-light-border dark:border-dark-border
                 text-light-text dark:text-dark-text
                 hover:bg-light-hover dark:hover:bg-dark-hover
                 shadow-card dark:shadow-dark-card
                 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                 hover:scale-110 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                 dark:focus:ring-offset-dark-bg"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414zM2.05 6.464l2.83 2.83a1 1 0 001.414-1.414L3.464 5.05a1 1 0 00-1.414 1.414zM17.95 6.464l-2.83 2.83a1 1 0 101.414 1.414l2.83-2.83a1 1 0 00-1.414-1.414zM15.657 12.193l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414zM6 5a1 1 0 00-1 1v1a1 1 0 002 0V6a1 1 0 00-1-1zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM14 10a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
