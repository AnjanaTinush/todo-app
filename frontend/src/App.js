import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 bg-light-bg dark:bg-dark-bg">
        {/* Header */}
        <header className="border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TaskHub
              </h1>
            </div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Organize your tasks with style
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-80px)]">
          <Home />
        </main>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Footer */}
        <footer className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface mt-12">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <p>Built with 💜 | TaskHub v1.0</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
