import express from "express";
import {
  router as dwpRouter
} from "./routes/routes.js";
import {
  router as swaggerRouter
} from "./routes/swagger.js";
import cors from "cors";
import proxy from "http-proxy-middleware";
const {
  createProxyMiddleware
} = proxy;
const port = process.env.PORT || 3000;
let proxyPort = process.env.PROXYPORT || 5000;
proxyPort = port === proxyPort ? parseInt(port) + 1 : proxyPort;
console.log(proxyPort);
console.log(port);


export const app = express();
export const proxyApp = express();
proxyApp.use(cors());
proxyApp.use(
  "/",
  createProxyMiddleware({
    target: `http://localhost:${port}/`, //original url
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

proxyApp.use(
  "/api",
  createProxyMiddleware({
    target: `http://localhost:${port}/`, //original url
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      //return swaggerRouter(req, res);
    },
  })
);

/**
 * Based Route to the API end point which maps to the router specified
 * @param  {} "/"
 * @param  {} dwpRouter
 */
app.use("/", dwpRouter);

/**
 * Swagger api endpoint
 * @param  {} "/api"
 * @param  {} swaggerRouter
 */
app.use("/api", swaggerRouter);

/**
 * Error not found
 * @param  {} function(req
 * @param  {} res
 * @param  {} next
 */
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/**
 * Error handler
 * @param  {} function(err
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
app.use(function (err, req, res, next) {
  console.error(`Error catched! ${err}`);

  const error = {
    status: err.status || 500,
    message: err.message,
  };

  res.status(error.status).send(error);
});

/**
 * Returns valid error messages back to the client
 * @param  {} error
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
/**
 * Listner handler function
 */
function onListening() {
  const addr = app.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("\nListening on " + bind);
}

app.listen(port);
proxyApp.listen(proxyPort);
app.on("error", onError);
app.on("listening", onListening);

proxyApp.on("error", onError);
proxyApp.on("listening", onListening);

console.log("Server started on port " + port);
console.log("Proxy started on port " + proxyPort);