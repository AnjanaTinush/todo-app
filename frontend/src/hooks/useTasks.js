import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, updateTask, deleteTask } from "../api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      // Ensure data is always an array
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data && typeof data === "object") {
        // If data is an object with a tasks property, use that
        setTasks(Array.isArray(data.tasks) ? data.tasks : []);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]);
    }
  };

  const addTask = async (task) => {
    try {
      await createTask(task);
      await loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const markAsDone = async (id) => {
    try {
      await completeTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Error marking task as done:", error);
      throw error;
    }
  };

  const editTask = async (id, task) => {
    try {
      await updateTask(id, task);
      await loadTasks();
    } catch (error) {
      console.error("Error editing task:", error);
      throw error;
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Error removing task:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, addTask, markAsDone, editTask, removeTask };
};
