const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const newsRoutes = require("./routes/api/newsRoutes");
const petsRouter = require("./routes/api/pets");
const authRouter = require("./routes/api/auth");
const { errorHandler } = require("../src/helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/api/pets", petsRouter);
app.use("/api/users", authRouter);
app.use("/api/news", newsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
