import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import fs from "fs";

import { userRouter } from "./routes/auth.js";
// import { todosRouter } from "./routes/todoRoutes.js";
import { boardRoutes } from "./routes/dashboardRoutes.js";
import { columnRoutes } from "./routes/columnRoutes.js";

import swaggerUi from "swagger-ui-express";


const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", userRouter);
// app.use("/api/todos", todosRouter);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);   

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
