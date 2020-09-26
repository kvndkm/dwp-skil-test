import Router from "express";
import swaggerUi from "swagger-ui-express";
import getFileContent from '../helper/fileUtils.js'
const swaggerDocument = JSON.parse(getFileContent('swagger.json'));
swaggerDocument.servers[0].url = swaggerDocument.servers[0].url.replace("3000", process.env.PORT || 3030);
export const router = new Router();


router.get("/json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));