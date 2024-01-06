import { Router } from "express";
import { login_controller } from "../controllers/login.js";
import { isLoggedIn } from "../services/middlewares.js";

export const router_login = Router();

router_login.post('/register', login_controller.register)
router_login.post('/login', login_controller.login);