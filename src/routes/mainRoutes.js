import { Router } from "express";
import { main_controller } from "../controllers/main.js";

export const router_main = Router();

router_main.get("/torneos", main_controller.get_torneos);