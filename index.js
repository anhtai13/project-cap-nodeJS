import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import router from "./src/application/routers.js";

const app = express();

// Serving file
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(cors());

// Cấu hình body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Cấu hình morgan
const accessLogStream = fs.createWriteStream("logs/access.log", { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", router);

app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
});
