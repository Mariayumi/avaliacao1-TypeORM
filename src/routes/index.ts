import {Router} from "express";
import match from "./match";
import team from "./team";

const routes = Router();

routes.use("/team", team)
routes.use("/match", match)

export default routes;