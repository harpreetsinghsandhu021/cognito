import express from "express";
import paperRoutes from "./routes/paperRoutes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/papers", paperRoutes);

export default app;
