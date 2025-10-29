import express from "express";
import {
  createTask,
  getTasks,
  markDone,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id/done", markDone);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
