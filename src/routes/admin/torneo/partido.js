import { Router } from "express";
import { partido_controller } from "../../../controllers/admin/torneo/partido.js";
import { isLoggedIn } from "../../../services/middlewares.js";

const router = Router();

router.get("/:idTorneo/partidos", partido_controller.get_partidos);
router.get("/:idTorneo/partidos/:id", partido_controller.get_partido_by_id);

router.post("/:idTorneo/partidos", isLoggedIn, partido_controller.create_partido);
router.put("/:idTorneo/partidos/:id", isLoggedIn, partido_controller.update_partido);
router.delete("/:idTorneo/partidos/:id", isLoggedIn, partido_controller.delete_partido);


export default router;