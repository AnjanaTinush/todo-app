import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import EditTaskModal from "../components/EditTaskModal";
import { useTasks } from "../hooks/useTasks";

const Home = () => {
  const { isDark } = useTheme();
  const { tasks, addTask, markAsDone, editTask, removeTask } = useTasks();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    editTask(updatedTask.id, updatedTask);
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="home py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className={`text-5xl font-bold mb-3
                          ${isDark
            ? "text-dark-text"
            : "bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
          }`}>
            Welcome back! 👋
          </h1>
          <p className={`text-lg
                        ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
            Manage your tasks efficiently and stay organized
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Form Section - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-[80px]">
              <TaskForm onAdd={addTask} />
            </div>
          </div>

          {/* Task List Section */}
          <div className="lg:col-span-3">
            {tasks.length > 0 && (
              <div className={`mb-6 p-4 rounded-xl border
                              ${isDark
                ? "bg-dark-surface border-dark-border"
                : "bg-light-surface border-light-border"
              }`}
              >
                <p className={`text-sm font-semibold
                              ${isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
                }`}>
                  📊 Progress: {tasks.length} active task{tasks.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            <TaskList
              tasks={tasks}
              onDone={markAsDone}
              onEdit={handleEditClick}
              onDelete={removeTask}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isEditOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};

export default Home;
