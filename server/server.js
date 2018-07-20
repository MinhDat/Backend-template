import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import http from "http";

// const dbs = Connection.main;
// var db = mongoose.connection;
const app = Express();
import API from "./api/";

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("oh_token", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json({ limit: "100mb" })); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 100000
  })
); // support encoded bodies
app.use(morgan("dev"));
app.use("/api", API);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;
app.set("port", port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app, (req, res) => res.end("test"));
/**
 * Listen on provided port, on all network interfaces.
 */
server.on("listening", () => console.log("ok, server is running"));
server.listen(port, () => console.log(`API running on localhost:${port}`));

export default app;
