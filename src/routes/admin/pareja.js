import { Router } from "express";
import { pareja_controller } from "../../controllers/admin/pareja";

const router = Router();

router.get("/", pareja_controller.get_parejas);
router.get("/id", pareja_controller.get_pareja_by_id);
router.post("/", pareja_controller.create_pareja);
router.put("/:id", pareja_controller.update_pareja);

export default router