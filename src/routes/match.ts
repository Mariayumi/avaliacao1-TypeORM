import {Router} from "express"
import MatchController from "../controllers/MatchController"


const router = Router ()

router.post ("/" , MatchController.createMatch)
router.get("/", MatchController.list);
router.get("/:id", MatchController.getByTeamId);
router.put("/", MatchController.update);
router.delete("/", MatchController.delete);

export default router