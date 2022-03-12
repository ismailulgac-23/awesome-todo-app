import { Router } from "express"
import * as Controller from './todo-controller';
const router = Router();
router.post("/", Controller.createTodo);
router.delete("/:todoID", Controller.deleteTodo);
router.patch("/:todoID", Controller.updateTodo);
export default router;