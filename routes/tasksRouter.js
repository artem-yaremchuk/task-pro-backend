import express from "express";
import { authorization } from '../middlewares/authMiddleware.js'
import { validateBody } from '../middlewares/validateBody.js'
import { isValidId } from '../middlewares/isValidId.js'
import { addTaskSchema } from '../schemas/addTaskSchema.js'
import { postTask, deleteTask} from '../controllers/taskController.js'
const tasksRouter = express.Router();

tasksRouter.post(
    "/",
    authorization,
    validateBody(addTaskSchema, `missing fields`),
    postTask
 );

 tasksRouter.delete("/:id", authorization, isValidId, deleteTask);

export default tasksRouter;