import Router from "express";
import { getUsers } from "./appEntryFunctions.js";
export const router = new Router();

router.get("/city/:city/radius/:radius", getUsers);

// const port = process.env.PORT || 3000;
// router.listen(port, () => "DWP API Listening on port - " + port);
