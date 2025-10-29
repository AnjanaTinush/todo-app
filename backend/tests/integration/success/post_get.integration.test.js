

import request from "supertest";
import { jest } from "@jest/globals";


const mockAddTask = jest.fn();
const mockListRecentTasks = jest.fn();

jest.unstable_mockModule("../../../src/services/taskService.js", () => ({
  addTask: mockAddTask,
  listRecentTasks: mockListRecentTasks,
  completeTask: jest.fn(),
  editTask: jest.fn(),
  removeTask: jest.fn(),
}));

// Import app after mocks are configured
const { default: app } = await import("../../../src/app.js");

describe("Integration (success) — /api/tasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/tasks — returns 201 and created task", async () => {
    const payload = { title: "Test task", description: "desc", emoji: "😊" };
    const created = { id: 1, ...payload, completed: false };
    mockAddTask.mockResolvedValue(created);

    const res = await request(app).post("/api/tasks").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: payload.title, description: payload.description, emoji: payload.emoji });
    expect(mockAddTask).toHaveBeenCalledWith(payload.title, payload.description, payload.emoji);
  });

  test("GET /api/tasks — returns 200 and tasks array", async () => {
    const tasks = [
      { id: 1, title: "T1", description: "D1", emoji: "🙂", completed: false },
    ];
    mockListRecentTasks.mockResolvedValue(tasks);

    const res = await request(app).get("/api/tasks");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject({ id: 1, title: "T1" });
    expect(mockListRecentTasks).toHaveBeenCalled();
  });
});
