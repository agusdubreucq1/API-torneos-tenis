import { Router } from "express";
import { inscripcion_controller } from "../../../controllers/admin/torneo/inscripcion.js";
import { isLoggedIn } from "../../../services/middlewares.js";

const router = Router();

router.get("/:idTorneo/inscripciones", inscripcion_controller.get_inscripciones);
router.get("/:idTorneo/jugadoresNoInscriptos", inscripcion_controller.getJugadoresNoInscritos);
router.post("/:idTorneo/inscripciones", isLoggedIn, inscripcion_controller.create_inscripcion);
router.post("/:idTorneo/autoInscripcion", isLoggedIn, inscripcion_controller.create_inscripcion_by_jugador);
router.delete("/:idTorneo/inscripciones/:id", isLoggedIn, inscripcion_controller.delete_inscripcion);

export default router