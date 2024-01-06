import { Router } from "express";
import { partido_controller } from "../../../controllers/admin/torneo/partido.js";

const router = Router();

router.get("/:idTorneo/partidos", partido_controller.get_partidos);
router.post("/:idTorneo/partidos", partido_controller.create_partido);
router.get("/:idTorneo/partidos/:id", partido_controller.get_partido_by_id);
router.put("/:idTorneo/partidos/:id", partido_controller.update_partido);

export default router;