const express = require("express");
const router = require("./src/route/api");
const connectDB = require("./src/database/DBConnect");
const app = new express();
const bodyParser = require("body-parser");

//Security Middleware

const cors = require("cors");

//Security Middleware Implement
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());

//mongodb Connection
connectDB();

// Managing BackEnd API Routing
app.use("/", router);

module.exports = app;
