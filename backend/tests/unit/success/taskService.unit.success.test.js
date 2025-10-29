/**
 * Unit success-only tests for taskService (business logic) using mocked model
 * methods. These tests assert the happy-path behavior only.
 *
 * NOTE: Assumes Jest as test runner. If not installed, add `jest` to backend
 * devDependencies.
 */

import { jest } from "@jest/globals";
// Use Jest ESM mocking to mock the model before the service is imported.
const mockCreateTask = jest.fn();
const mockGetRecentTasks = jest.fn();

jest.unstable_mockModule("../../../src/models/taskModel.js", () => ({
  createTask: mockCreateTask,
  getRecentTasks: mockGetRecentTasks,
  markTaskAsDone: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  initTable: jest.fn(),
}));

// Import the service after the model has been mocked
const TaskService = await import("../../../src/services/taskService.js");

describe("Unit (success) — taskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addTask returns created task when title provided", async () => {
    const payload = { title: "Unit task", description: "d", emoji: "😄" };
    const created = { id: 10, ...payload, completed: false };
    mockCreateTask.mockResolvedValue(created);

    const res = await TaskService.addTask(payload.title, payload.description, payload.emoji);

    expect(mockCreateTask).toHaveBeenCalledWith(payload.title, payload.description, payload.emoji);
    expect(res).toEqual(created);
  });

  test("listRecentTasks returns array of tasks", async () => {
    const tasks = [{ id: 2, title: "T2", description: "D2", emoji: "🙂", completed: false }];
    mockGetRecentTasks.mockResolvedValue(tasks);

    const res = await TaskService.listRecentTasks();

    expect(mockGetRecentTasks).toHaveBeenCalled();
    expect(res).toEqual(tasks);
  });
});
