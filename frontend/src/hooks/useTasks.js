import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, updateTask, deleteTask } from "../api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async (task) => {
    await createTask(task);
    await loadTasks();
  };

  const markAsDone = async (id) => {
    await completeTask(id);
    await loadTasks();
  };

  const editTask = async (id, task) => {
    await updateTask(id, task);
    await loadTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, addTask, markAsDone, editTask, removeTask };
};
