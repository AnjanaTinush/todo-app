import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

const Home = () => {
  const { tasks, addTask, markAsDone } = useTasks();

  return (
    <div className="home">
      <h1>My Todo List</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDone={markAsDone} />
    </div>
  );
};

export default Home;
