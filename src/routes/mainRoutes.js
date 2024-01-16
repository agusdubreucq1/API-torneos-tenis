import { Router } from "express";
import { main_controller } from "../controllers/main.js";

export const router_main = Router();

router_main.get("/torneos", main_controller.get_torneos);
router_main.get("/torneos/:id", main_controller.get_torneo_by_id);