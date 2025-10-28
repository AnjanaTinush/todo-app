import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask } from "../api/taskService";

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

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, addTask, markAsDone };
};
