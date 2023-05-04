import team from "./team";
import {Router} from "express";

const routes = Router();

routes.use("/team", team)

export default routes;