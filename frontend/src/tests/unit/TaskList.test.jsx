import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeContext";
import TaskList from "../../components/TaskList";

describe("TaskList (unit) — happy path", () => {
  test("shows empty state when no tasks", () => {
    render(
      <ThemeProvider>
        <TaskList tasks={[]} />
      </ThemeProvider>
    );

    expect(screen.getByText(/No tasks yet!/i)).toBeInTheDocument();
    expect(screen.getByText(/Create your first task to get started/i)).toBeInTheDocument();
  });

  test("handles undefined tasks (negative case) and shows empty state", () => {
    render(
      <ThemeProvider>
        <TaskList />
      </ThemeProvider>
    );

    expect(screen.getByText(/No tasks yet!/i)).toBeInTheDocument();
  });

  test("renders tasks and count", () => {
    const tasks = [
      { id: 1, title: "A", emoji: "🙂" },
      { id: 2, title: "B", emoji: "😄" },
    ];

    render(
      <ThemeProvider>
        <TaskList tasks={tasks} />
      </ThemeProvider>
    );

    expect(screen.getByText(/2 tasks to complete/i)).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
