import { Router } from "express";
import { inscripcion_controller } from "../../../controllers/admin/torneo/inscripcion.js";

const router = Router();
// router.get("/:idTorneo/inscripciones", (req, res)=>{
//     console.log(req.params)
//     res.send("llego")
// })

router.get("/:idTorneo/inscripciones", inscripcion_controller.get_inscripciones);
router.post("/:idTorneo/inscripciones", inscripcion_controller.create_inscripcion);
router.delete("/:idTorneo/inscripciones/:id", inscripcion_controller.delete_inscripcion);

export default router