import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeContext";
import TaskItem from "../../components/TaskItem";

describe("TaskItem (unit) — happy path", () => {
  const task = {
    id: 42,
    title: "Test Task",
    description: "Do something",
    emoji: "🔥",
    created_at: new Date().toISOString(),
  };

  test("renders task and calls handlers", () => {
    const onDone = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <ThemeProvider>
        <TaskItem task={task} onDone={onDone} onEdit={onEdit} onDelete={onDelete} />
      </ThemeProvider>
    );

    // Title and emoji present
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("🔥")).toBeInTheDocument();

    // Buttons
    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    expect(onEdit).toHaveBeenCalledWith(task);

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(onDelete).toHaveBeenCalledWith(task.id);

    fireEvent.click(screen.getByRole("button", { name: /Done/i }));
    expect(onDone).toHaveBeenCalledWith(task.id);
  });

  test("negative: missing handlers do not throw when clicked (graceful)", () => {
    // Render without handlers
    render(
      <ThemeProvider>
        <TaskItem task={task} />
      </ThemeProvider>
    );

    const editBtn = screen.getByRole("button", { name: /Edit/i });
    // Clicking should not throw because TaskItem guards callbacks
    expect(() => fireEvent.click(editBtn)).not.toThrow();
  });
});
