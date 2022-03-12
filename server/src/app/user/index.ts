import { Router } from "express"
import * as Controller from './user-controller';
const router = Router();
router.get("/", Controller.searchUsers);
export default router;