import { Router } from "express";
import { jugador_controller } from "../../controllers/admin/jugador.js";
import { isLoggedIn } from "../../services/middlewares.js";

const router = Router();

router.get("/", jugador_controller.get_jugadores);
router.get("/:id", jugador_controller.get_jugador_by_id);
router.get('/:id/partidos', jugador_controller.get_partidos_by_jugador);

router.post("/",isLoggedIn, jugador_controller.create_jugador);
router.put("/:id",isLoggedIn, jugador_controller.update_jugador);


export default router;
