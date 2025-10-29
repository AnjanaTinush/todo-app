import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import EditTaskModal from "../components/EditTaskModal";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";
import imoji from "../asset/imoji.png";
import { useTasks } from "../hooks/useTasks";

const Home = () => {
  const { isDark } = useTheme();
  const { tasks, addTask, markAsDone, editTask, removeTask } = useTasks();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    taskId: null,
    type: null,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await editTask(updatedTask.id, updatedTask);
      showToast("Task updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update task", "error");
    }
  };

  const handleDeleteClick = (taskId) => {
    setConfirmDialog({ isOpen: true, taskId, type: "delete" });
  };

  const handleDoneClick = (taskId) => {
    setConfirmDialog({ isOpen: true, taskId, type: "done" });
  };

  const handleConfirmAction = async () => {
    const { taskId, type } = confirmDialog;

    try {
      if (type === "delete") {
        await removeTask(taskId);
        showToast("Task deleted successfully!", "success");
      } else if (type === "done") {
        await markAsDone(taskId);
        showToast("Task marked as done!", "success");
      }
      setConfirmDialog({ isOpen: false, taskId: null, type: null });
    } catch (error) {
      showToast("Failed to complete action", "error");
    }
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    setEditingTask(null);
  };

  return (
    <div className={`home min-h-screen flex flex-col py-8 px-6 ${
      isDark ? "bg-dark-bg" : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        {/* Page Header */}
        <div className="mb-12 text-center flex-shrink-0">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1
              className={`text-5xl font-bold ${
                isDark ? "text-dark-text" : "text-gray-900"
              }`}
            >
              Welcome back!
            </h1>
            <img
              src={imoji}
              alt="TaskHub emoji"
              className="h-20 w-20 object-contain"
            />
          </div>

          <p
            className={`text-lg ${
              isDark ? "text-dark-text-secondary" : "text-gray-600"
            }`}
          >
            Manage your tasks efficiently and stay organized
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Form Section - Left Side */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <TaskForm
                onAdd={async (taskData) => {
                  try {
                    await addTask(taskData);
                    showToast("Task created successfully!", "success");
                  } catch (error) {
                    showToast("Failed to create task", "error");
                  }
                }}
              />
            </div>
          </div>

          {/* Task List Section - Right Side */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Progress Info - Fixed at top */}
            {tasks.length > 0 && (
              <div
                className={`mb-6 p-4 rounded-xl border flex-shrink-0 shadow-sm ${
                  isDark
                    ? "bg-dark-surface border-dark-border"
                    : "bg-white border-gray-200"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-gray-700"
                  }`}
                >
                  Progress: {tasks.length} active task
                  {tasks.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {/* Scrollable Task List Container - Shows ~3 cards */}
            <div
              className="overflow-y-auto custom-scrollbar pr-2 rounded-lg"
              style={{
                height: "520px",
                maxHeight: "calc(100vh - 280px)",
              }}
            >
              <TaskList
                tasks={tasks}
                onDone={handleDoneClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification - Top Center */}
      {toast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {/* Edit Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isEditOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateTask}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.type === "delete"
            ? "Delete Task?"
            : confirmDialog.type === "done"
            ? "Mark Task as Done?"
            : ""
        }
        message={
          confirmDialog.type === "delete"
            ? "Are you sure you want to delete this task? This action cannot be undone."
            : confirmDialog.type === "done"
            ? "Are you sure you want to mark this task as done?"
            : ""
        }
        confirmText={confirmDialog.type === "delete" ? "Delete" : "Done"}
        cancelText="Cancel"
        type={confirmDialog.type === "delete" ? "danger" : "warning"}
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setConfirmDialog({ isOpen: false, taskId: null, type: null })
        }
      />
    </div>
  );
};

export default Home;