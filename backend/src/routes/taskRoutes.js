import express from "express";
import {
  createTask,
  getTasks,
  markDone,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id/done", markDone);

export default router;
