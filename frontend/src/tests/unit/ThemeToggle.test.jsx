import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";

describe("ThemeToggle (unit) — happy path", () => {
  beforeEach(() => localStorage.clear());

  test("renders and toggles theme title", () => {
    // start with light theme
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /toggle theme/i });
    // initial title for light mode
    expect(button).toHaveAttribute("title", "Switch to dark mode");

    // click toggles theme
    fireEvent.click(button);

    // after toggle title should update
    expect(button).toHaveAttribute("title", "Switch to light mode");
  });

  test("negative: useTheme used outside ThemeProvider throws", () => {
    // small consumer component that calls useTheme
    const { useTheme } = require("../../context/ThemeContext");
    const Consumer = () => {
      useTheme();
      return null;
    };

    expect(() => render(<Consumer />)).toThrow(/useTheme must be used within ThemeProvider/);
  });
});
