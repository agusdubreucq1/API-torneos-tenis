import { Router } from "express";
import { jugador_controller } from "../../controllers/admin/jugador.js";

const router = Router();

router.get("/", jugador_controller.get_jugadores);
router.post("/", jugador_controller.create_jugador);
router.get("/:id", jugador_controller.get_jugador_by_id);
router.put("/:id", jugador_controller.update_jugador);

export default router;
