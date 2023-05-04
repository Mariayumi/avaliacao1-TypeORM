import { Router } from "express";
import TeamController from "../controllers/TeamController";

const router = Router();

router.post("/", TeamController.create);
router.get("/", TeamController.list);
router.get("/:name", TeamController.listByName);
router.put("/", TeamController.update);
router.delete("/", TeamController.delete);

export default router;