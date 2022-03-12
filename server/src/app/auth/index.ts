import { Router } from "express"
import * as Controller from './auth-controller';
const router = Router();

router.get("/", Controller.isAuth);
router.post("/", Controller.onRegister);
router.post("/login", Controller.onLogin);

export default router;