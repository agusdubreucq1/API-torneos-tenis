import { Router } from "express";
import { torneo_controller } from "../../../controllers/admin/torneo/torneo.js";
import router_partido from "./partido.js";
import router_inscripcion from "./inscripcion.js";
import { isAdmin, isAdminOfTorneo } from "../../../services/middlewares.js";

const router = Router();

router.get("/", torneo_controller.get_torneos);
router.get("/:id", torneo_controller.get_torneo_by_id);
router.post("/", isAdmin, torneo_controller.create_torneo);
router.put("/:idTorneo",isAdmin, isAdminOfTorneo, torneo_controller.update_torneo);
router.delete("/:idTorneo",isAdmin, isAdminOfTorneo, torneo_controller.delete_torneo);

router.use("/", router_partido);
router.use("/", router_inscripcion);

export default router;