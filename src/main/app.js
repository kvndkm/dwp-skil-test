import express from "express";
import { router as dwpRouter } from "./routes/routes.js";
import { router as swaggerRouter } from "./routes/swagger.js";

export const app = express();
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

const port = process.env.PORT || 3000;
app.listen(port);
app.on("error", onError);
app.on("listening", onListening);

console.log("Server started on port " + port);
