import { Router } from "express"
import * as Controller from './group-controller';
const router = Router();
router.get("/", Controller.getGroups);
router.get("/:groupID", Controller.getGroup);
router.post("/", Controller.createGroup);
router.post("/user", Controller.addUserToGroup);
export default router;