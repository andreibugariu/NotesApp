import * as UserController from "../controllers/usersController"
import express from "express";

const router = express.Router();

router.post("/signup", UserController.signUp)
router.post("/login", UserController.login)
router.get("/", UserController.getAuthenticatedUser)
router.post("/logout", UserController.logout)
router.get("/userId", UserController.getUserIdSession)









export default router;