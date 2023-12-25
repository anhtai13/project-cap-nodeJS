import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import router from "./src/application/routes.js";
import cors from "cors";
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Cấu hình body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Cấu hình morgan
const accessLogStream = fs.createWriteStream("logs/access.log", { flags: "a" });
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", router);

app.listen(3131, () => {
  console.log("Example app listening on port 3131!");
});
