import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; // ✅ Adjust for your backend

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      await axios.post(API_URL, form);
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Mark as done
  const handleDone = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/done`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-light">
      <div className="w-11/12 max-w-5xl bg-white rounded-2xl shadow-card p-10 flex gap-10">
        {/* Left Panel */}
        <div className="w-1/3 border-r pr-8">
          <h2 className="text-xl font-semibold mb-6">Add a Task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <button type="submit" className="mt-2">Add</button>
          </form>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 pl-8">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available</p>
          ) : (
            <div className="flex flex-col gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-neutral rounded-lg p-4 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-500 text-sm">{task.description}</p>
                  </div>
                  <button
                    onClick={() => handleDone(task.id)}
                    className="border border-primary text-primary bg-white hover:bg-primary hover:text-white transition rounded-md px-4 py-1"
                  >
                    Done
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
