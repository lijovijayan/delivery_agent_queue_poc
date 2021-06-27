import express from "express";
import { routes } from "./routes";
import { closeDBConnection, initializeDB } from "./services/mysql.service";

const app = express();
const port = 3000;
const host = "127.0.0.1";

app.use("/", (req, res, next) => {
  console.log(`requested on:  ${host}:${port}${req.url}  [${req.method}]`);
  next();
});

app.use("/", routes);

app.listen(port, host, () => {
  initializeDB();
  return console.log(`server is listening on ${port}`);
});
