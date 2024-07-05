import express from "express"
import {
  createTask,
  deleteTask,
  editTask,
  getAllCompletedTasks,
  getAllTaskByCategory,
  getAllTasks,
  getTasksForToday,
  toggletaskStatus
} from "../controllers/taskController"
import { authenticationMiddleware } from "../middleware/authMiddleware"



const taskRoutes = express.Router()

taskRoutes.use(authenticationMiddleware)

taskRoutes.route("/").get(getAllTasks)
taskRoutes.route("/create").post(createTask)
taskRoutes.route("/task-by-categories/:id").get(getAllTaskByCategory)
taskRoutes.route("/completed").get(getAllCompletedTasks)
taskRoutes.route("/today").get(getTasksForToday)
taskRoutes.route("/create").post(createTask)
taskRoutes.route("/update/:id").put(toggletaskStatus)
taskRoutes.route("/:id").delete(deleteTask)
taskRoutes.route("/edit/:id").put(editTask)

export default taskRoutes