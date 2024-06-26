import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";


import fs from "fs";

import { userRouter } from "./routes/auth.js";
import { todoRouter } from "./routes/todoRoutes.js";
import { boardRouter } from "./routes/boardRoutes.js";
import { columnRouter } from "./routes/columnRoutes.js";

import swaggerUi from "swagger-ui-express";


const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);
app.use("/api/boards", boardRouter);
app.use("/api/columns", columnRouter);   

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
